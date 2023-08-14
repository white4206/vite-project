<template>
    <el-dialog :close-on-click-modal="false" :destroy-on-close="true" :align-center="true" :close-on-press-escape="false"
        @close="handleCancel">
        <div class="dialog-box">
            <el-form ref="formRef" :model="form" status-icon size="large" label-position="top"
                require-asterisk-position="right">
                <el-form-item label="您的参赛团队" prop="team">
                    <template #label>
                        <span class="title-text">您的参赛团队</span>
                    </template>
                    <div class="option-item">
                        <img :src="form.team.logo.url" :alt="form.team.name" width="25">
                        <span>{{ form.team.name }}</span>
                    </div>
                </el-form-item>
                <el-form-item label="报名附件" prop="file">
                    <template #label>
                        <span class="title-text">报名附件</span>
                    </template>
                    <el-link :icon="Link" :underline="true">{{ form.file.name }}</el-link>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <template #label>
                        <span class="title-text">备注</span>
                    </template>
                    <el-input disabled v-model="form.desc" :rows="3" maxlength="100" type="textarea" resize="none" />
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { Link } from '@element-plus/icons-vue';
import axios from 'axios'
import { ref, onMounted } from 'vue'
import useUserStore from '../../../../store/userStore'

const store = useUserStore()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    id: {
        type: Number
    }
})
const form = ref<{
    team: any,
    file: any,
    desc: string
}>({
    team: '',
    file: '',
    desc: ''
})

const getData = () => {
    axios.get(`http://localhost:3000/competitions?id=${props.id}`)
        .then(res => {
            res.data[0].signUpList.map(item => {
                if (item.leaderId === store.userInformation.id) {
                    form.value.desc = item.desc
                    form.value.file = item.file
                    axios.get(`http://localhost:3000/teams?id=${item.teamId}`)
                        .then(res => {
                            form.value.team = res.data[0]
                        })
                        .catch(err => {
                            console.error(err)
                            ElMessage.error(err)
                        })
                }
            })
        })
        .catch(err => {
            console.error(err)
            ElMessage.error(err)
        })
}
onMounted(() => {
    getData()
})
const handleCancel = () => {
    getData()
    emit('update:modelValue', false)
}
</script>
<style lang="scss" scoped>
.option-item {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
        padding-left: 10px;
    }
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.dialog-box {
    padding: 0 50px;
}

.title-text {
    font-size: 16px;
    font-weight: bold;
    color: #606266;
}
</style>

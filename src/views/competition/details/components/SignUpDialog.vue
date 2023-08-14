<template>
    <el-dialog :close-on-click-modal="false" :destroy-on-close="true" :align-center="true" :close-on-press-escape="false"
        @close="handleClose">
        <div class="dialog-box">
            <el-form ref="formRef" :model="form" :rules="rules" status-icon size="large" label-position="top"
                require-asterisk-position="right">
                <el-form-item label="选择您的参赛团队" prop="team" required>
                    <template #label>
                        <span class="title-text">选择您的参赛团队</span>
                    </template>
                    <el-select v-model="form.team" value-key="id" placeholder="请选择团队" size="large" :filterable="true"
                        no-match-text="未找到您的团队" no-data-text="您还没有自己的团队" :clearable="true">
                        <el-option v-for="(item, index) in teamData" :key="item.id" :label="item.name" :value="item">
                            <div class="option-item">
                                <img :src="item.logo.url" :alt="item.name" width="25">
                                <span>{{ item.name }}</span>
                            </div>
                        </el-option>
                        <template #prefix>
                            <img v-if="form.team" :src="form.team.logo?.url" :alt="form.team?.name" width="25">
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传附件" prop="file">
                    <template #label>
                        <span class="title-text">上传附件</span>
                    </template>
                    <UploadFiles @uploadFile="handleUploadFile"></UploadFiles>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <template #label>
                        <span class="title-text">备注</span>
                    </template>
                    <el-input v-model="form.desc" :rows="3" maxlength="100" show-word-limit type="textarea" resize="none" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSignUp">报名</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import UploadFiles from './UploadFiles.vue'
import { ElMessage } from 'element-plus';
import axios from 'axios'
import { ref, onMounted, inject } from 'vue'
import type { Ref } from 'vue'
import useUserStore from '../../../../store/userStore'

const store = useUserStore()
const props = defineProps({
    id: {
        type: Number
    }
})
const teamData = ref()
const emit = defineEmits(['update:modelValue', 'getData'])
onMounted(() => {
    axios.get(`http://localhost:3000/teams`)
        .then(res => {
            teamData.value = []
            res.data.map(item => {
                if (item.leader.studentNumber === store.userInformation.studentNumber)
                    teamData.value?.push(item)
            })
        })
        .catch(err => {
            console.error(err)
            ElMessage.error(err)
        })
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
const uploadFile = ref()
const handleUploadFile = (msg) => {
    uploadFile.value = msg
}
const rules = ref()
const formRef = ref()
const isSignUp: Ref<any> | undefined = inject('isSignUp')
const handleSignUp = () => {
    let signUpList
    axios.get(`http://localhost:3000/teams?id=${form.value.team.id}`)
        .then(res => {
            signUpList = {
                leaderId: store.userInformation.id,
                teamId: form.value.team.id,
                teacherId: res.data[0].teacher.id,
                file: uploadFile.value[0],
                desc: form.value.desc,
                signUpStatus: "waiting"
            }
        })
        .catch(err => {
            ElMessage.error(err)
            console.log(err)
        })
    axios.get(`http://localhost:3000/competitions?id=${props!.id}`)
        .then(res => {
            let tempSignUpList = res.data[0].signUpList
            tempSignUpList.push(signUpList)
            axios.patch(`http://localhost:3000/competitions/${props!.id}`, {
                signUpList: tempSignUpList
            })
                .then(res => {
                    isSignUp!.value = true
                    emit('update:modelValue', false)
                    formRef.value.resetFields()
                    emit('getData')
                    ElMessage.success("报名信息提交成功")
                })
                .catch(err => {
                    ElMessage.error(err)
                    console.log(err)
                })
        })
        .catch(err => {
            ElMessage.error(err)
            console.log(err)
        })
}
const handleClose = () => {
    emit('update:modelValue', false)
}
const handleCancel = () => {
    formRef.value.resetFields()
    emit('update:modelValue', false)
    ElMessage.info("取消修改")
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

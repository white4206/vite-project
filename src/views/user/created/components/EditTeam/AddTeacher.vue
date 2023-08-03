<template>
    <el-form ref="FormRef" :model="form" status-icon label-width="120px" :rules="rules" :disabled="canUse">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工号" prop="jobNumber">
            <el-input v-model="form.jobNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch(FormRef)">查找</el-button>
            <el-button @click="handleCancel(FormRef)">取消</el-button>
        </el-form-item>
        <div class="search-result-success" v-if="isSuccess">
            <p>搜索到以下用户：</p>
            <p>
                <span style="padding-right:20px;">姓名：{{ searchResult!.name }}</span>
                <span>学号：{{ searchResult!.jobNumber }}</span>
            </p>
            <p>
                <el-button type="primary" plain style="width: 100%;" @click="handleConfirm">确认邀请</el-button>
            </p>
        </div>
        <div class="search-result-exit" v-if="isExit">
            <p>该团队已存在指导老师，</p>
            <p>若更改指导老师请先联系指导老师解除指导</p>
        </div>
    </el-form>
</template>
  
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { reactive, ref, onMounted, inject } from 'vue'
import type { FormInstance } from 'element-plus'

const canUse = ref()
const emit = defineEmits(['searchCancel'])
const props = defineProps({
    teamName: {
        type: String
    },
    teamTeacher: {
        type: Object
    },
    id: {
        type: Number
    }
})
onMounted(() => {
    if (JSON.stringify(props.teamTeacher) !== '{}') {
        isExit.value = true
        canUse.value = true
    }
})
const rules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { min: 1, max: 10, message: '长度不可以超过10位', trigger: 'blur' }],
    jobNumber: { required: true, message: '请输入工号', trigger: 'blur' }
})
const FormRef = ref<FormInstance>()
const form = reactive({
    jobNumber: '',
    name: '',
})
const isSuccess = ref(false)
const isExit = ref(false)
const searchResult = ref<{
    name: String,
    jobNumber: String,
    id: Number
}>()
const handleSearch = (formEl: FormInstance | undefined) => {
    formEl?.validate().then(res => {
        isSuccess.value = false
        isExit.value = false
        if (JSON.stringify(props.teamTeacher) !== '{}') {
            isExit.value = true
            canUse.value = true
        }
        else {
            axios.get(`http://localhost:3000/teachers?jobNumber=${form.jobNumber}&name=${form.name}`)
                .then(res => {
                    if (res.data.length === 0) ElMessage.error("未找到用户，请确认信息无误")
                    else {
                        searchResult.value = res.data[0]
                        isSuccess.value = true
                    }
                })
                .catch(err => {
                    console.error(err)
                    ElMessage.error(err)
                })
        }
    }
    ).catch(err => {
        ElMessage.error("请正确填写用户信息")
    })
}
const getTeamData: Function | undefined = inject("getData")
const handleConfirm = () => {
    axios.patch(`http://localhost:3000/teams/${props.id}`, {
        teacher: searchResult.value
    })
        .then(res => {
            getTeamData!("AddTeacher")
            canUse.value = true
            FormRef.value!.resetFields()
            isSuccess.value = false
        })
        .catch(err => {
            console.error(err)
            ElMessage.error(err)
        })
}
const handleCancel = (formEl: FormInstance | undefined) => {
    isSuccess.value = false
    emit('searchCancel')
    FormRef.value!.resetFields()
    formEl?.resetFields()
}
defineExpose({
    handleCancel
});
</script>

<style lang="scss" scoped>
.search-result-success {
    margin: 10px 0;

    p {
        margin-bottom: 5px;
        font-size: 12px;
        color: #666666;
    }
}

.search-result-exit {
    margin: 0 0 0 120px;

    p {
        margin-bottom: 5px;
        font-size: 12px;
        color: #666666;
    }
}
</style>

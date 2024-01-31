<template>
    <el-form ref="formRef" :model="form" status-icon label-width="120px" :rules="rules" :disabled="canUse">
        <el-form-item label="工号" prop="jobNumber">
            <el-input v-model="form.jobNumber" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查找</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
        <!-- <div class="search-result-exit" v-if="isExit">
            <p>该团队已存在指导老师，若更改指导老师请先联系指导老师解除指导</p>
        </div> -->
    </el-form>
</template>
  
<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref, onMounted, inject } from 'vue'
import { inviteTeacher } from '@/api/team.js'

const canUse = ref()
const emit = defineEmits(['searchCancel'])
const props = defineProps({
    teacherData: {
        type: Object
    },
    id: {
        type: Number
    }
})
onMounted(() => {
    // if (JSON.stringify(props.teacherData) !== undefined) {
    //     isExit.value = true
    //     canUse.value = true
    // }
})
const rules = reactive({ jobNumber: { required: true, message: '请输入工号', trigger: 'blur' } })
const formRef = ref()
const form = reactive({ jobNumber: '' })
// const isExit = ref(false)
const getTeamTeacher = inject("getTeamTeacher")
const handleSearch = () => {
    formRef.value.validate().then(res => {
        inviteTeacher(props.id,
            form.jobNumber)
            .then(res => {
                if (res.code === 200)
                    ElMessage.success('邀请发送成功')
                if (res.code === 0)
                    ElMessage.warning(res.data)
                getTeamTeacher()
            })
            .catch(err => console.log(err))
    }
    ).catch(err => {
        ElMessage.error("请正确填写用户信息")
    })
}
const handleCancel = () => {
    emit('searchCancel')
    formRef.value?.resetFields()
}
const handleChange = () => {
    formRef.value?.resetFields()
}
defineExpose({
    handleChange
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

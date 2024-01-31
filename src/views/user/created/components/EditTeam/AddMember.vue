<template>
    <el-form ref="formRef" :model="form" status-icon label-width="120px" :rules="rules">
        <el-form-item label="学号" prop="studentNumber">
            <el-input v-model="form.studentNumber" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查找</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { reactive, ref, inject} from 'vue'
import { ElMessage } from 'element-plus'
import { inviteMember } from '@/api/team.js'

const emit = defineEmits(['searchCancel'])
const props = defineProps({
    memberData: {
        type: Object
    },
    id: {
        type: Number
    }
})
const rules = reactive({ studentNumber: [{ required: true, message: '请输入学号', trigger: 'blur' }, { min: 0, max: 11, message: '学号为11位数字', trigger: 'blur' }] })
const formRef = ref()
const form = reactive({ studentNumber: '' })
const getTeamMember = inject("getTeamMember")
const handleSearch = () => {
    formRef.value.validate().then(res => {
        inviteMember(props.id, {
            username: form.studentNumber
        })
            .then(res => {
                if (res.code === 200)
                    ElMessage.success('邀请发送成功')
                if (res.code === 0)
                    ElMessage.warning('邀请待同意或' + res.data)
                getTeamMember()
            })
            .catch(err => console.log(err))
    }).catch(err => {
        ElMessage.error("请检查学号填写")
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
</style>

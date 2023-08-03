<template>
    <el-form ref="FormRef" :model="form" status-icon label-width="120px" :rules="rules">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学号" prop="studentNumber">
            <el-input v-model="form.studentNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch(FormRef)">查找</el-button>
            <el-button @click="handleCancel(FormRef)">取消</el-button>
        </el-form-item>
        <div class="search-result-success" v-if="isSuccess">
            <p>搜索到以下用户：</p>
            <p>
                <span style="padding-right:20px;">姓名：{{ searchResult!.name }}</span>
                <span>学号：{{ searchResult!.studentNumber }}</span>
            </p>
            <p>
                <el-button type="primary" plain style="width: 100%;"
                    @click="handleConfirm(searchResult!.id)">确认邀请</el-button>
            </p>
        </div>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, inject } from 'vue'
import axios from "axios"
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

const emit = defineEmits(['searchCancel'])
const props = defineProps({
    teamName: {
        type: String
    },
    teamMember: {
        type: Object
    }
})
const rules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { min: 1, max: 10, message: '长度不可以超过10位', trigger: 'blur' }],
    studentNumber: [{ required: true, message: '请输入学号', trigger: 'blur' }, { min: 11, max: 11, message: '学号为11位数字', trigger: 'blur' }]
})
const FormRef = ref<FormInstance>()
const form = reactive({
    studentNumber: '',
    name: '',
})
const isSuccess = ref(false)
const searchResult = ref<{
    name: string,
    studentNumber: string,
    id: number
}>()
const handleSearch = (formEl: FormInstance | undefined) => {
    formEl?.validate().then(res => {
        isSuccess.value = false
        axios.get(`http://localhost:3000/users?username=stu12345678`)
            .then(res => {
                let userStudentNumber = res.data[0].username
                axios.get(`http://localhost:3000/students?studentNumber=${form.studentNumber}&name=${form.name}`)
                    .then(res => {
                        if (res.data.length === 0) ElMessage.error("未找到用户，请确认信息无误")
                        else {
                            searchResult.value = res.data[0]
                            let ExitState = false
                            props.teamMember!.map((item) => {
                                if (item.studentNumber === searchResult!.value!.studentNumber) ExitState = true
                            })
                            if (userStudentNumber === searchResult!.value!.studentNumber) ElMessage.warning("不能邀请自己为成员")
                            else if (ExitState) ElMessage.warning("该用户已在团队中")
                            else isSuccess.value = true
                        }
                    })
                    .catch(err => console.log(err))
            }).catch(err => console.log(err))

    }).catch(err => {
        ElMessage.error("请正确填写用户信息")
    })
}
const getData: Function | undefined = inject("getData")
const handleConfirm = (id) => {
    axios.patch(`http://localhost:3000/students/${id}`, {
        team: props.teamName
    })
        .then(res => {
            getData!("AddMember")
        })
        .catch(err => console.log(err))
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
</style>

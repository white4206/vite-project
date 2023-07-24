<template>
    <el-form :model="form" :rules="rules" label-width="120px" label-position="left" size="large">
        <el-form-item label="手机号">
            <el-input v-model="form.phoneNumber" />
        </el-form-item>
        <el-form-item label="真实姓名">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="电子邮箱">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="学历层次">
            <el-select v-model="form.level" placeholder="please select your zone">
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
            </el-select>
        </el-form-item>
        <el-form-item label="所在学院">
            <el-select v-model="form.department" placeholder="please select your zone">
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
            </el-select>
        </el-form-item>
        <el-form-item label="专业名称">
            <el-input v-model="form.major" />
        </el-form-item>
        <el-form-item label="学号">
            <el-input v-model="form.studentNumber" />
        </el-form-item>
        <el-form-item label="入学时间">
            <el-date-picker v-model="form.startDate" type="date" placeholder="Pick a date" style="width: 100%" />
        </el-form-item>
        <el-form-item label="毕业时间">
            <el-date-picker v-model="form.finishDate" type="date" placeholder="Pick a date" style="width: 100%" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive,ref } from 'vue'

// do not use same name with ref
const form = reactive({
    phoneNumber: '',
    name: '',
    email: '',
    level: '',
    department: '',
    major: '',
    studentNumber: '',
    startDate: '',
    finishDate: '',
})
const rules = ref('')
const onSubmit = () => {
    console.log('submit!')
}
</script>
  
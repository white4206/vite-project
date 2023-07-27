<template>
    <el-form ref="ruleFormRef" :model="form" status-icon label-width="120px">
        <el-form-item label="工号" prop="jobNumber">
            <el-input v-model="form.jobNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const form = reactive({
    jobNumber: '',
    name: '',
    phoneNumber: '',
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
  
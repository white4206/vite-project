<template>
    <div style="margin: 20px" />
    <h1>登录</h1>
    <!-- isLogged?route.fullPath:'./login' -->
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="账号">
            <el-input v-model="input1" class="w-50 m-2" placeholder="用户名">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <User />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="input2" type="password" class="w-50 m-2" placeholder="密码" show-password>
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <Lock />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form>
</template>
<script setup>
import { reactive, ref, inject } from 'vue'
import axios from 'axios';
import { useRouter } from "vue-router"

const labelPosition = ref('top')

const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})
import { Lock, User } from '@element-plus/icons-vue'
const input1 = ref('')
const input2 = ref('')
const router = useRouter()
const isLogged = inject("isLogged")
const onSubmit = () => {
    axios
        .get(`http://localhost:3000/users?username=${input1.value}&password=${input2.value}`)
        .then((res) => {
            if (res.data.length) {
                isLogged.value = true
                router.push("./home")
                localStorage.setItem("loginToken", "successful login")
            }
        })
        .catch((err) => console.log(err));
}
</script>

<style scoped>
</style>

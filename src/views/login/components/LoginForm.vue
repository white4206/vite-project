<template>
    <div style="margin: 20px" />
    <h1>登录</h1>
    <!-- isLogged?route.fullPath:'./login' -->
    <el-form :label-position="labelPosition" label-width="100px" :model="form">
        <el-form-item label="账号">
            <el-input v-model="form.name" class="w-50 m-2" placeholder="用户名">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <User />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" type="password" class="w-50 m-2" placeholder="密码" show-password>
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
import { Lock, User } from '@element-plus/icons-vue'
import useLoginStore from '../../../store/loginStore';
import useTeacherStore from '../../../store/UserStore';
import { ElMessage } from 'element-plus'
const labelPosition = ref('top')
const form = reactive({
    name: '',
    password: '',
})
const router = useRouter()
// const isLogged = inject("isLogged")
const loginStore = useLoginStore()
const teacherStore = useTeacherStore()
const onSubmit = () => {
    axios
        .get(`http://localhost:3000/users?username=${form.name}&password=${form.password}`)
        .then((res) => {
            if (res.data.length) {
                // isLogged.value = true
                loginStore.$patch({
                    isLogged: true
                })
                teacherStore.$patch({
                    isTeacher: res.data[0].isTeacher
                })
                router.push("./home")
                localStorage.setItem("loginToken", "successful login")
                ElMessage.success("登陆成功")
            }
        })
        .catch((err) => console.log(err));
}
</script>

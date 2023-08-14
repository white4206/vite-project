<template>
    <el-card :class="whichUser ? 'stuLogin' : 'teaLogin'">
        <h1 v-if="whichUser" class="formTitle">学生登录</h1>
        <h1 v-if="!whichUser" class="formTitle">教师登录</h1>
        <!-- isLogged?route.fullPath:'./login' -->
        <el-form :label-position="labelPosition" label-width="100px" :model="form">
            <el-form-item :label="whichUser ? '学号' : '职工号'">
                <el-input v-model="form.name" placeholder="用户名">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <User />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" placeholder="密码" show-password>
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form>
    </el-card>
    <div class="switchBtn">
        <h4>{{ whichUser ? "教师登录" : "学生登录" }}</h4>
        <el-button type="primary" plain circle :icon="Switch" @click="handleSwitch"></el-button>
    </div>
</template>
<script setup>
import { reactive, ref, inject } from 'vue'
import axios from 'axios';
import { useRouter } from "vue-router"
import { Lock, User, Switch } from '@element-plus/icons-vue'
import useLoginStore from '../../../store/loginStore';
import useUserStore from '../../../store/userStore';
import { ElMessage } from 'element-plus'

const labelPosition = ref('top')
const form = reactive({
    name: '',
    password: '',
})
const router = useRouter()
// const isLogged = inject("isLogged")
const loginStore = useLoginStore()
const userStore = useUserStore()
const onSubmit = () => {
    axios.get(`http://localhost:3000/${whichUser.value ? "users" : "teaUsers"}?username=${form.name}&password=${form.password}`)
        .then((res) => {
            if (res.data.length === 1) {
                // isLogged.value = true
                loginStore.$patch({
                    isLogged: true
                })


                userStore.isTeacher = res.data[0].isTeacher
                userStore.userInformation = res.data[0]
                console.log(userStore.userInformation)
                router.push("./home")
                localStorage.setItem("loginToken", "successful login")
                ElMessage.success("登陆成功")
            }
            else if (res.data.length > 1)
                ElMessage.error("error")

            else
                ElMessage.error("账号或密码输入错误")
        })
        .catch((err) => {
            console.error(err)
            ElMessage.error(err)
        });
}
const whichUser = ref(true)
const handleSwitch = () => {
    whichUser.value = !whichUser.value
}
</script>

<style>
@keyframes stuLoginFormMove {
    from {
        transform: translate(500px)
    }

    to {}
}

@keyframes teaLoginFormMove {
    from {
        transform: translate(500px)
    }

    to {}
}
</style>
<style lang="scss" scoped>
.stuLogin {
    animation: 1s stuLoginFormMove;
    transition: .8s;
}

.teaLogin {
    animation: 1s teaLoginFormMove;
    transition: .8s;
}

.switchBtn {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0px;
    right: 0px;

    h4 {
        color: #95c7f4;
        margin-right: 10px;
    }
}
</style>

<template>
  <el-card :class="whichUser ? 'stuLogin' : 'teaLogin'">
    <h1 v-if="whichUser" class="formTitle">学生登录</h1>
    <h1 v-if="!whichUser" class="formTitle">教师登录</h1>
    <!-- isLogged?route.fullPath:'./login' -->
    <el-form label-position="top" label-width="100px" :model="form">
      <el-form-item :label="whichUser ? '学号' : '职工号'">
        <el-input v-model="form.username" placeholder="用户名">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="密码" show-password>
          <template #prefix>
            <el-icon class="el-input__icon">
              <Lock/>
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
import {reactive, ref, onMounted} from 'vue'
import {useRouter} from "vue-router"
import {Lock, User, Switch} from '@element-plus/icons-vue'
import useLoginStore from '@/store/loginStore.js';
import {ElMessage} from 'element-plus'
import {login} from "@/api/login.js"

const store = useLoginStore()
const form = reactive({
  username: '',
  password: '',
  role: '1'
})
const router = useRouter()
onMounted(() => {

})
const onSubmit = () => {
  store.REMOVE_TOKEN()
  login(form)
      .then(res => {
        if (res.code === 200) {
          store.SET_ROLE(form.role)
          store.SET_TOKEN(res.data.token)
          router.push("./home")
          ElMessage.success(res.msg)
        } else
          ElMessage.warning('请检查学生登录或教师登录')
      })
      .catch(err => {
        if (err.response.status === 403)
          ElMessage.error("账号或者密码错误")
        else if (err.response.status === 500)
          ElMessage.error("服务端错误,请联系管理员")
      })
}
const whichUser = ref(true)
const handleSwitch = () => {
  whichUser.value = !whichUser.value
  if (whichUser.value)
    form.role = "1"
  else
    form.role = "2"
}
</script>

<style>
@keyframes stuLoginFormMove {
  from {
    transform: translate(500px)
  }

  to {
  }
}

@keyframes teaLoginFormMove {
  from {
    transform: translate(500px)
  }

  to {
  }
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

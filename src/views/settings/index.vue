<template>
  <el-main>
    <el-row justify="center">
      <el-col :span="18">
        <el-card class="changePassword-box" shadow="never">
          <template #header>用户账号密码修改</template>
          <el-steps class="steps-box" :active="activeStep" finish-status="success" align-center>
            <el-step title="验证身份"/>
            <el-step title="设置密码"/>
            <el-step title="修改成功"/>
          </el-steps>
          <div class="changePasswordForm">
            <el-form v-if="activeStep === 0" :model="identityFrom" style="width: 500px">
              <el-form-item>
                <el-input v-model="identityFrom.phoneNumber">
                  <template #prepend>原手机号</template>
                </el-input>
              </el-form-item>
              <el-form-item class="input-group">
                <el-input v-model="identityFrom.code" style="width:380px"/>
                <el-button>获取验证码</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%;">下一步</el-button>
              </el-form-item>
            </el-form>
            <el-form v-if="activeStep === 1" size="large" :model="passwordFrom" style="width: 500px" :rules="rules"
                     ref="formRef">
              <!-- <el-form-item prop="oldPassword">
              <el-input v-model="passwordFrom.oldPassword" type="password" show-password>
                  <template #prepend>原密码</template>
              </el-input>
          </el-form-item> -->
              <el-form-item prop="newPassword">
                <el-input v-model="passwordFrom.newPassword" type="password" show-password>
                  <template #prepend>新密码</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input v-model="passwordFrom.confirmPassword" type="password" show-password>
                  <template #prepend>确认密码</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button :loading="loading" type="primary" style="width: 100%;"
                           @click="handleChangePassword">下一步
                </el-button>
              </el-form-item>
            </el-form>
            <div v-if="activeStep === 2" style="width: 500px"/>
            <el-result v-if="activeStep === 3" icon="success" title="密码修改成功" sub-title="即将刷新.."
                       style="width: 500px">
            </el-result>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup>
import {ref} from 'vue'
import {changePw} from '@/api/setting.js'
import {ElMessage, ElLoading} from 'element-plus'

const activeStep = ref(1)
const formRef = ref()
const identityFrom = ref({
  phoneNumber: '',
  code: ''
})
const passwordFrom = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
// const oldPwValidator = (rule, value, callback) => {
//     if (value !== store.userInformation.password)
//         callback(new Error("请检查原密码是否正确"));
//     else callback();
// }
const newPwValidator = (rule, value, callback) => {
  if (!/^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{8,16}$/.test(value))
    callback(new Error("由字母、数字、特殊字符，任意2种组成，长度8-16个字符"));
  else callback();
}
const confirmPwValidator = (rule, value, callback) => {
  if (value === '' || value !== passwordFrom.value.newPassword)
    callback(new Error("两次密码输入不一致"));
  else callback();
}
const rules = ref({
  // oldPassword: [{ required: false, validator: oldPwValidator, trigger: 'submit' }],
  newPassword: [{required: false, validator: newPwValidator, trigger: 'blur'}],
  confirmPassword: [{required: false, validator: confirmPwValidator, trigger: 'blur'}]
})
const loading = ref(false)
const handleChangePassword = () => {
  formRef.value.validate().then(res => {
    loading.value = true
    setTimeout(() => {
      changePw({
        password: passwordFrom.value.confirmPassword
      })
          .then(res => {
            if (res.code === 200) {
              loading.value = false
              activeStep.value = 2
              ElMessage.success(res.data.data)
              activeStep.value = 3
              // let fullscreenLoading = ElLoading.service({ fullscreen: true })
              setTimeout(() => {
                // fullscreenLoading.close()
                location.reload()
              }, 2000)
            }
          })
          .catch(err => {
            console.log(err)
            ElMessage.error(err)
          })
    }, 1000)
  })
      .catch(err => {
        ElMessage.error("请检查密码填写是否符合要求")
      })
}
</script>

<style>
@keyframes changePasswordBoxMove {
  from {
    transform: translate(0, -500px)
  }

  to {
  }
}
</style>

<style lang="scss" scoped>
.changePassword-box {
  animation: 1s changePasswordBoxMove;
  transition: .8s;
  border-radius: 15px;
  padding: 20px;
  height: 600px;
  background-color: #FFFFFF;
}

.changePasswordForm {
  display: flex;
  justify-content: center;
  align-items: center;
}

.steps-box {
  margin-top: 20px;
  margin-bottom: 60px;
}

::v-deep .input-group {
  .el-form-item__content {
    justify-content: space-between;
  }
}
</style>

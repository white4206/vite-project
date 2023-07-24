<template>
    <div class="login-box">
        <el-row justify="space-around" align="middle">
            <el-col :span="8">
                <div class="grid-content">
                    <LoginImg></LoginImg>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content LoginForm">
                    <LoginForm></LoginForm>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
  
<script setup>
import LoginForm from "./components/LoginForm.vue"
import LoginImg from "./components/LoginImg.vue"
localStorage.setItem("loginToken", "")
</script>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.LoginForm {
    text-align: center;
    padding: 50px;
    background-color: #ecf5ff;
    border-radius: 10px
}

.login-box {
    margin: 10px 120px;
    border: 1px solid #d1d2d2;
    border-radius: 20px;
    box-shadow: rgb(194, 193, 193) 0px 0px 8px 0px;
}
</style>
  

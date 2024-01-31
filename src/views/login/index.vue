<template>
    <el-main>
        <el-card class="login-box">
            <el-row justify="center" align="middle">
                <el-col :span="12">
                    <div class="grid-content">
                        <LoginImg></LoginImg>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content LoginForm">
                        <LoginForm></LoginForm>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </el-main>
</template>
  
<script setup>
import LoginForm from "./components/LoginForm.vue"
import LoginImg from "./components/LoginImg.vue"
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
    padding: 10px;
    background-color: #ecf5ff;
    border-radius: 50px;
}

.login-box {
    user-select: none;
    margin: 50px 12.5%;
    border-radius: 25px;
    background-color: #FFFFFF;
}
</style>
  

<template>
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
</template>
  
<script setup>
import LoginForm from "../../views/login/Form.vue"
import LoginImg from "../../views/login/Img.vue"
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
</style>
  

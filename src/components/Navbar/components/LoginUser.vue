<template>
    <el-sub-menu index="5">
        <template #title>
            <Avatar></Avatar>
        </template>
        <el-menu-item index="/user">
            <el-icon>
                <User />
            </el-icon>
            <span>个人中心</span>
        </el-menu-item>
        <el-menu-item index="/setting">
            <el-icon>
                <Setting />
            </el-icon>
            <span>设置</span>
        </el-menu-item>
        <el-menu-item index="/login" @click="handleExit">
            <el-icon>
                <Close color="red" />
            </el-icon>
            <span>登出</span>
        </el-menu-item>
    </el-sub-menu>
</template>

<script setup>
import { inject } from 'vue'
import { Close, User, Setting } from '@element-plus/icons-vue'
import Avatar from "./Avatar.vue";

const isLogged = inject("isLogged")
const handleExit = () => {
    isLogged.value = false
}
</script>

<style scoped>
</style>

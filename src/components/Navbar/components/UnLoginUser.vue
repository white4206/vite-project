<template>
    <el-sub-menu index="">
        <template #title>
            <Avatar></Avatar>
        </template>
        <el-menu-item index="/login">
            <el-icon>
                <User />
            </el-icon>
            <span>登录</span>
        </el-menu-item>
        <el-menu-item disabled index="5-2">
            <el-icon>
                <More />
            </el-icon>
            <span>登陆以使用更多功能</span>
        </el-menu-item>
    </el-sub-menu>
</template>

<script setup>
import { More, User } from '@element-plus/icons-vue'
import Avatar from "./Avatar.vue";
</script>

<style scoped>
</style>

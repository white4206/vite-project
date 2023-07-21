<template>
    <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
        <Logo></Logo>
        <el-menu-item index="/home">
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/competition"><span>竞赛信息</span></el-menu-item>
        <el-menu-item index="/notice"><span>系统公告</span></el-menu-item>
        <div class="flex-grow" />
        <UnLoginUser v-if="!isLogged"></UnLoginUser>
        <LoginUser v-else></LoginUser>
    </el-menu>
</template>

<script setup>
import { onMounted, computed, inject } from 'vue'
import Logo from "./components/Logo.vue"
import LoginUser from './components/LoginUser.vue'
import UnLoginUser from "./components/UnLoginUser.vue";
import { useRoute, useRouter } from "vue-router"

const isLogged = inject("isLogged")
const route = useRoute()
const router = useRouter()
onMounted(() => {
    if (!isLogged.value) {
        router.push('/login')
    }

})
const defaultActive = computed(() => {
    console.log(route.fullPath.split("/")[1])
    return '/' + route.fullPath.split("/")[1]
})
</script>

<style>
.logo {
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 14px;
    color: #303133;
}

.el-header {
    padding: 0px;
}

.flex-grow {
    flex-grow: 1;
}
</style> 

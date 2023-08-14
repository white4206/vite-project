<template>
    <el-affix :offset="0" :z-index="9999">
        <el-menu :default-active="defaultActive" class="el-menu-box" mode="horizontal" :ellipsis="false" router>
            <Logo></Logo>
            <el-menu-item index="/home">
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/competition"><span>竞赛信息</span></el-menu-item>
            <el-menu-item index="/notice"><span>系统公告</span></el-menu-item>
            <div class="flex-grow" />
            <UnLoginUser v-if="!store.isLogged"></UnLoginUser>
            <LoginUser v-else></LoginUser>
        </el-menu>
    </el-affix>
</template>

<script setup>
import { onMounted, computed, inject } from 'vue'
import Logo from "./components/Logo.vue"
import LoginUser from './components/LoginUser.vue'
import UnLoginUser from "./components/UnLoginUser.vue";
import { useRoute, useRouter } from "vue-router"
import useLoginStore from '../../store/loginStore';
const store = useLoginStore()
// const isLogged = inject("isLogged")
const route = useRoute()
const router = useRouter()
onMounted(() => {
    if (!store.isLogged) {
        router.push('/login')
    }

})
const defaultActive = computed(() => {
    return '/' + route.fullPath.split("/")[1]
})
</script>

<style lang="scss">
.el-header {
    padding: 0px;
}
</style>

<style lang="scss" scoped>
.el-menu-box {
    padding: 0;
}

.logo {
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 14px;
    color: #303133;
}

.flex-grow {
    flex-grow: 1;
}
</style> 

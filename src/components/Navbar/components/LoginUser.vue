<template>
    <el-sub-menu index="5">
        <template #title>
            <UserAvatar></UserAvatar>
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
// import { inject } from 'vue'
import UserAvatar from './UserAvatar.vue';
import { Close, User, Setting } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import useLoginStore from '../../../store/loginStore';
const store = useLoginStore()
// const isLogged = inject("isLogged")
const handleExit = () => {
    // isLogged.value = false
    store.isLogged = false
    ElMessage.error("退出登录")
}
</script>

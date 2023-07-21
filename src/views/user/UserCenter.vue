<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <Sidebar></Sidebar>
            </el-aside>
            <el-main>
                <UserCenterLayout></UserCenterLayout>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import UserCenterLayout from '../../layout/UserCenterLayout/UserCenterLayout.vue'
</script>

<style scoped>
.common-layout {}
</style>

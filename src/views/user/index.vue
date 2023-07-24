<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <Sidebar></Sidebar>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
    <el-row justify="space-around">
        <el-col :span="24">
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
        </el-col>
    </el-row>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
::v-deep .el-main {
    padding: 0px 20px;
}
</style>

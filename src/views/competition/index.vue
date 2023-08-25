<template>
    <div v-if="store.role === '2'">
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
    </div>
    <div v-if="store.role === '1'">
        <router-view></router-view>
    </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import useLoginStore from '@/store/loginStore';

const store = useLoginStore()
</script>

<style lang="scss" scoped>
::v-deep .el-main {
    padding: 0px 20px;
}
</style>

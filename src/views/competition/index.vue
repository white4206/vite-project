<template>
    <div v-if="store.isTeacher">
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
    <div v-if="!store.isTeacher">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import useUserStore from '../../store/userStore';
import Sidebar from './components/Sidebar.vue';

const store = useUserStore()
</script>

<style lang="scss" scoped>
::v-deep .el-main {
    padding: 0px 20px;
}
</style>

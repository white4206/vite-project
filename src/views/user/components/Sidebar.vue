<template>
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" router>
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Operation />
                </el-icon>
                <span>团队管理 </span>
            </template>
            <el-menu-item index="created">我创建的</el-menu-item>
            <el-menu-item index="joined">我加入的</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="message">
            <el-icon>
                <Message />
            </el-icon>
            <span>我的消息</span>
        </el-menu-item>
        <el-menu-item index="information">
            <el-icon>
                <User />
            </el-icon>
            <span>我的信息</span>
        </el-menu-item>
    </el-menu>
</template>
  
<script setup>
import {
    Operation,
    Message,
    User,
} from '@element-plus/icons-vue'
import { useRoute } from "vue-router"
import { computed } from 'vue'

const route = useRoute()
const defaultActive = computed(() => {
    return route.path.split("/")[2]
})
import { ElMenuItemGroup } from 'element-plus';
</script>

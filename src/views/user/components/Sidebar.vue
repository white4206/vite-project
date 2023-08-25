<template>
    <el-menu :default-active="defaultActive" class="el-menu-vertical-bar" router>
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Operation />
                </el-icon>
                <span>团队管理 </span>
            </template>
            <el-menu-item index="/user/created" v-if="store.role === '1'">我创建的</el-menu-item>
            <el-menu-item index="/user/joined" v-if="store.role === '1'">我加入的</el-menu-item>
            <el-menu-item index="/user/guided" v-if="store.role === '2'">我指导的</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/user/message">
            <el-icon>
                <Message />
            </el-icon>
            <span>我的消息</span>
        </el-menu-item>
        <el-menu-item index="/user/information">
            <el-icon>
                <User />
            </el-icon>
            <span>我的信息</span>
        </el-menu-item>
    </el-menu>
</template>
  
<script setup>
import { Operation, Message, User, GoldMedal } from '@element-plus/icons-vue'
import { useRoute } from "vue-router"
import { computed } from 'vue'
import useLoginStore from '@/store/loginStore.js'
import { ElMenuItemGroup } from 'element-plus';

const store = useLoginStore()
const route = useRoute()
const defaultActive = computed(() => {
    return '/' + route.path.split('/')[1] + '/' + route.path.split('/')[2]
})

</script>
<style lang="scss" scoped>
.el-menu-vertical-bar:not(.el-menu--collapse) {
    padding: 10px;
    width: 200px;
    height: 640px;
    min-height: 100%;
    border-radius: 5px;
}

.el-menu-item {
    margin: 10px 0;
    border-radius: 15px;
}

.el-menu-item.is-active {
    border-radius: 15px;
    background-color: #409EFF;
    color: #FFFFFF
}
</style>

<template>
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" router>
        <el-menu-item index="/competition/competitions">
            <el-icon>
                <TrophyBase />
            </el-icon>
            <span>竞赛列表</span>
        </el-menu-item>
        <el-menu-item index="/competition/checkSignUp">
            <el-icon>
                <EditPen />
            </el-icon>
            <span>报名审核</span>
        </el-menu-item>
    </el-menu>
</template>
  
<script setup>
import { EditPen, TrophyBase } from '@element-plus/icons-vue'
import { useRoute } from "vue-router"
import { computed } from 'vue'
import { ElMenuItemGroup } from 'element-plus';
import useUserStore from '../../../store/userStore'

const store = useUserStore()
const route = useRoute()
const defaultActive = computed(() => {
    return '/' + route.path.split('/')[1] + '/' + route.path.split('/')[2]
})

</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 400px;
    min-height: 100%;
    border-radius: 5px;
}
</style>

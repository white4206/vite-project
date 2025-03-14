<template>
  <el-affix :offset="0" :z-index="9999">
    <div style="background-color: #FFFFFF;border-bottom: 1px solid #dcdfe6;">
      <el-menu :default-active="defaultActive" class="el-menu-box" mode="horizontal" :ellipsis="false" router>
        <Logo></Logo>
        <el-menu-item index="/home"><span>首页</span></el-menu-item>
        <el-menu-item index="/competition"><span>竞赛信息</span></el-menu-item>
        <el-menu-item index="/notice"><span>系统公告</span></el-menu-item>
        <el-menu-item index="/analyze">
          <el-icon>
            <PieChart/>
          </el-icon>
          <span>竞争分析</span>
        </el-menu-item>

        <div class="flex-grow"/>
        <UnLoginUser v-if="route.fullPath==='/login'"></UnLoginUser>
        <LoginUser v-else></LoginUser>
        <el-menu-item index="/help"><span>帮助指南</span></el-menu-item>
<!--        <el-menu-item>-->
<!--          <a href="http://140.143.139.167:82" style="text-decoration: none">-->
<!--            <span>后台管理</span>-->
<!--          </a>-->
<!--        </el-menu-item>-->

      </el-menu>
    </div>
  </el-affix>
</template>

<script setup>
import {computed} from 'vue'
import Logo from "./components/Logo.vue"
import LoginUser from './components/LoginUser.vue'
import UnLoginUser from "./components/UnLoginUser.vue";
import {useRoute} from "vue-router"
import useLoginStore from '@/store/loginStore';
import {Link, PieChart} from '@element-plus/icons-vue'

const store = useLoginStore()
const route = useRoute()
const defaultActive = computed(() => {
  return '/' + route.fullPath.split("/")[1]
})
</script>

<style lang="scss">
.el-header {
  padding: 0;
}
</style>

<style lang="scss" scoped>
.el-menu-box {
  padding: 0;
  max-width: 1500px;
  margin: 0 auto;
  border-bottom: none;
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

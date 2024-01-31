<template>
  <div class="bottom-box">
    <el-row justify="center" :gutter="100" style="max-width: 1500px;margin: 0 auto;padding: 20px;">
      <el-col :span="9">
        <div class="logo">
          <Logo/>
          <span>学科竞赛服务平台</span>
        </div>
        <div class="content">
          <p>四川轻化工大学 - 计算机科学与工程学院</p>
          <p>学生可登入获取相关竞赛信息并组织参赛队伍参加竞赛，统计并分析学生所参加的竞赛信息及获奖信息。</p>
        </div>
        <div class="content">
          <p>版权信息、备案信息待完善</p>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="logo">
          <span>问题反馈</span>
        </div>
        <div class="content">
          <p>反馈途径</p>
          <p>反馈信息待完善</p>
        </div>
        <div class="logo">
          <span>联系我们</span>
        </div>
        <div class="content">
          <p>联系途径</p>
          <p>联系信息待完善</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {Message} from '@element-plus/icons-vue'
import Logo from "@/components/Bottom/components/Logo.vue";
</script>

<style lang="scss">
.el-footer {
  padding: 0px;
}
</style>

<style lang="scss" scoped>
.bottom-box {
  background-color: #303133;
  overflow: hidden;
}

.logo {
  height: 32px;
  color: #FFFFFF;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.content {
  margin-top: 20px;
  font-size: 12px;
  color: #A8ABB2;
}
</style>

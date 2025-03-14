<template>
  <div style="height:100%;display: flex;justify-content: center;align-items: center">
    <div>
      <el-row>
        <el-col class="content" :span="8">
          <el-button round size="large" style="background-color: #303133;color: #FFFFFF">良好学生</el-button>
        </el-col>
        <el-col class="content" :span="8"></el-col>
        <el-col class="content" :span="8"></el-col>
      </el-row>
      <el-row>
        <el-col class="content" :span="8"></el-col>
        <el-col class="content" :span="8">
          <el-button round size="large" style="background-color: #303133;color: #FFFFFF">效率值中等</el-button>
        </el-col>
        <el-col class="content" :span="8"></el-col>
      </el-row>
    </div>
    <div>
      <img src="/src/assets/userImage.svg" style="width: 250px"/>
    </div>
    <div>
      <el-row>
        <el-col class="content" :span="8"></el-col>
        <el-col class="content" :span="8">
          <el-button round size="large" style="background-color: #303133;color: #FFFFFF">参与度中等</el-button>
        </el-col>
        <el-col class="content" :span="8"></el-col>
      </el-row>
      <el-row>
        <el-col class="content" :span="8"></el-col>
        <el-col class="content" :span="8"></el-col>
        <el-col class="content" :span="8">
          <el-button round size="large" style="background-color: #303133;color: #FFFFFF">偏好竞赛:算法</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="content" :span="8">
          <el-button round size="large" style="background-color: #303133;color: #FFFFFF">近期活跃度高</el-button>
        </el-col>
        <el-col class="content" :span="8"></el-col>
        <el-col class="content" :span="8"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.content {
  margin-bottom: 20px;
}
</style>

<template>
  <el-card class="card" shadow="hover">
    <img :src="'/src/assets/noticeImg.png'" :alt="data?.infoTitle" class="image"/>
    <div class="card-title-box">
      <div class="card-title">
        {{ data?.infoTitle }}
      </div>
      <div style="text-align: right;font-size:12px;color:#909399">{{ data?.createTime }}</div>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 0px;
}

.image {
  height: 125px;
  width: 100%;
  display: block;
}

.card-title {
  font-size: 14px;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card {
  border-radius: 15px;
  cursor: pointer;
}

.card-title-box {
  padding: 10px;
}
</style>
  
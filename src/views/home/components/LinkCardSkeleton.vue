<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in 5">
          <el-card shadow="never">
            <div class="skeleton-box">
              <el-skeleton-item class="skeleton-img-item" variant="image"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>

<script setup>
</script>

<style scoped>
.el-card {
  border: none;
}

:deep(.el-card__header) {
  padding: 10px;

}

:deep(.el-card__body) {
  padding: 0;
  padding-top: 10px;
}

.skeleton-box {
  display: flex;
  flex-direction: column;
}

.skeleton-img-item {
  width: 100%;
  height: 200px;
}
</style>

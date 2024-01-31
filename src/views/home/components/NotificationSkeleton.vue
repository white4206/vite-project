<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <div class="skeleton-box">
        <el-skeleton-item class="skeleton-content-item" variant="p"/>
        <el-skeleton-item class="skeleton-content-item" variant="p"/>
        <el-skeleton-item class="skeleton-content-item" variant="p"/>
        <el-skeleton-item class="skeleton-content-item" variant="p"/>
        <el-skeleton-item class="skeleton-content-item" variant="p"/>
      </div>
    </template>

    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>

<script setup>

</script>
<style scoped lang="scss">
.skeleton-box {
  display: flex;
  flex-direction: column;
}

.skeleton-content-item:nth-child(2n-1) {
  width: 45%;
  height: 20px;
  margin-bottom: 20px;
}

.skeleton-content-item:nth-child(2n) {
  width: 85%;
  height: 20px;
  margin-bottom: 20px;
}

.skeleton-content-item:first-child {
  width: 15%;
  height: 20px;
  margin-bottom: 20px;
}

.skeleton-content-item:last-child {
  width: 100%;
  height: 20px;
  margin-bottom: 20px;
}
</style>
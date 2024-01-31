<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <div class="skeleton-box">
        <el-skeleton-item class="skeleton-img-item" variant="image"/>
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

.skeleton-img-item {
  width: 100%;
  height: 200px;
}
</style>
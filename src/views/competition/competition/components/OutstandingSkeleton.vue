<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <div v-for="item in 5" :key="item.id" class="outstanding-student">
        <div class="outstanding-student-info">
          <div class="outstanding-student-img-box">
            <el-skeleton-item class="skeleton-title-item" variant="image"/>
          </div>
          <div class="skeleton-content-box">
            <el-skeleton-item class="skeleton-content-item" variant="p" style="width: 20%"/>
            <el-skeleton-item class="skeleton-content-item" variant="p" style="width: 80%"/>
          </div>
        </div>
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
.skeleton-title-item {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.skeleton-content-box {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.skeleton-content-item {
  margin-bottom: 10px;
}

.outstanding-student {
  padding: 0 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

.outstanding-student-info {
  display: flex;
}

.outstanding-student-img-box {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
</style>
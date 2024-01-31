<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <div class="skeleton-box" v-for="item in 10">
        <el-skeleton-item class="skeleton-title-item" variant="image"/>
        <div class="skeleton-content-box">
          <el-skeleton-item class="skeleton-content-item" variant="p" style="width: 60%"/>
          <el-skeleton-item class="skeleton-content-item second" variant="p" style="width: 55%"/>
          <div>
            <el-skeleton-item class="skeleton-content-item" variant="p" style="width: 25%"/>
            <el-skeleton-item class="skeleton-content-item" variant="p" style="width: 15%"/>
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

<style scoped>
.skeleton-box {
  background-color: #FFFFFF;
  border-radius: 15px;
  height: 144px;
  margin-bottom: 20px;
}

.skeleton-title-item {
  position: absolute;
  width: 256px;
  height: 144px;
  border-radius: 15px;
}

.skeleton-content-box {
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.skeleton-content-item {
  margin-left: 286px;
  height: 20px;
}

.second {
  margin-left: 286px;
  height: 50px;
}
</style>

<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <div class="skeleton-box">
        <div class="skeleton-content-box">
          <el-skeleton-item v-for="item in 5" class="skeleton-content-item" variant="h1"
                            :style="{width: parseInt(Math.random()*(80-30+1)+30,10)+'%'}"/>
        </div>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>

<style scoped>
.skeleton-box {
  background-color: #FFFFFF;
  border-radius: 15px;
  padding: 20px;
}

.skeleton-content-box {
  display: flex;
  flex-direction: column;
}

.skeleton-content-item {
  margin-bottom: 20px;
}
</style>

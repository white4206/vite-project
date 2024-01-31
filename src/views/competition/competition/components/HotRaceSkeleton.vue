<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <div class="hotCompetition" v-for="item in 10">
        <div class="rankingNumber">{{ item }}</div>
        <el-skeleton-item class="skeleton-content-item" variant="p"
                          :style="{width: parseInt(Math.random()*(80-30+1)+30,10)+'%'}"/>
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
.hotCompetition {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.rankingNumber {
  width: 20px;
  text-align: center;
  font-weight: bold;
  padding: 0 10px;
  color: #909399;
}

.hotCompetition:nth-child(1) .rankingNumber {
  color: #F56C6C;
}

.hotCompetition:nth-child(2) .rankingNumber {
  color: #E6A23C;
}

.hotCompetition:nth-child(3) .rankingNumber {
  color: #67C23A;
}
</style>
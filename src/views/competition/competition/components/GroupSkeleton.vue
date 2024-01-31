<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <ul>
        <li class="hotChatGroup" v-for="item in 5">
          <el-skeleton-item class="skeleton-content-item" variant="p"
                            :style="{width: parseInt(Math.random()*(80-30+1)+30,10)+'%'}"/>
        </li>
      </ul>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>
<script setup>

</script>
<style scoped lang="scss">
.skeleton-content-item {
  margin-bottom: 10px;
}

.hotChatGroup .skeleton-content-item {
  margin-bottom: 0;
  margin-right: 10px;
}

.hotChatGroup {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .text {
    font-size: 14px;
  }
}

.hotChatGroup:before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #c6e2ff;
  border-radius: 1px;
  margin: 0 10px;
}
</style>
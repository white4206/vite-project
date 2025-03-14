<template>
  <div class="container">
    <div>
      <img :src="data.headImage" alt=""
           style="width: 100%;height: 200px;border-radius: 5px">
      <span class="title-text">{{ data.title }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 200px;
}
.container img{
  cursor: pointer;
}
.title-text {
  z-index: 999;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #FFFFFF;
  padding: 10px;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

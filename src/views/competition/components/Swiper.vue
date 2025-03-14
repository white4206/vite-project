<template>
  <div v-loading="loading">
    <el-carousel class="swiper-box" v-loading="false" trigger="click" height="300px">
      <el-carousel-item v-for="item in imageList" :key="item.id" style="text-align: center">
        <img class="swiper-img" :src="item.imageUrl" :alt="item.title">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getCompetitionRotation} from "@/api/competition.js";

const imageList = ref([])
const loading = ref(true)
onMounted(() => {
  getCompetitionRotation().then(res => {
    imageList.value = res.data.map((item, index) => {
      return {
        ...item,
        imageUrl: import.meta.env.VITE_BASE_URL + item.imageUrl
      }
    })
    imageList.value.splice(0,1);
    loading.value = false
  })
})
</script>

<style lang="scss" scoped>
:deep(.el-loading-mask), .swiper-box {
  border-radius: 15px
}

.swiper-img {
  height: 500px;
  width: 100%;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
  
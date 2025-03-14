<template>
  <div v-loading="loading">
    <el-carousel class="swiper-box" v-loading="false" trigger="click" height="400px">
      <el-carousel-item v-for="item in imageList" :key="item.id" style="text-align: center">
        <img @click="handleLinkTo(item.link)" class="swiper-img" :src="item.imageUrl" :alt="item.title">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getHomeRotation} from "@/api/home.js";

const imageList = ref([])
const loading = ref(true)

const handleLinkTo=(linkUrl)=>{
  // 路径不完整使用以下代码
  window.open('https://'+linkUrl)

  // 路径完整使用以下代码
  /* window.open("linkUrl")*/
}
onMounted(() => {
  getHomeRotation().then(res => {
    imageList.value = res.data.map(item => {
      return {
        ...item,
        imageUrl: import.meta.env.VITE_BASE_URL + item.imageUrl
      }
    })
    loading.value = false
  })
})
</script>

<style lang="scss" scoped>
.swiper-box{
  cursor: pointer;
}
.swiper-img {
  height: 400px;
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
  
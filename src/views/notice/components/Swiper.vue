<template>
    <el-carousel class="swiper-box" trigger="click" v-loading="loading" height="200px">
        <el-carousel-item v-for="(item, index) in imageList" :key="item.id" style="text-align: center">
            <img class="swiper-img" :src="item.url" :alt="item.name">
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const imageList = ref([])
const loading = ref < boolean > (true)
onMounted(() => {
    setTimeout(() => {
        imageList.value = [
            {
                name: "不忘初心",
                url: "https://jsj.suse.edu.cn/_rest/linker_allfile.ashx?parr=news%2c637484178485721070%2c.jpg%2c0%2c0%2c202307261010%2cc3db589b01fcd445f831272f04e35933&said=636059516973492676",
                id: 1
            },
            {
                name: "宜宾校区",
                url: "https://jsj.suse.edu.cn/_rest/linker_allfile.ashx?parr=news%2c637285245472948593%2c.png%2c0%2c0%2c202307261010%2cc3db589b01fcd445f831272f04e35933&said=636059516973492676",
                id: 2
            },
            {
                name: "宜宾校区",
                url: "https://www.suse.edu.cn/_rest/linker_allfile.ashx?parr=news%2c636735607532505026%2c.jpg%2c0%2c0%2c202307251615%2cc2248ebc34fa7df12e0bc0ef9bfe5469&said=636122975317834394",
                id: 3
            },
            {
                name: "黄岭校区",
                url: "https://www.suse.edu.cn/_rest/linker_allfile.ashx?parr=news%2c637979944710583838%2c.jpg%2c0%2c0%2c202307251615%2cc2248ebc34fa7df12e0bc0ef9bfe5469&said=636122975317834394",
                id: 4
            }
        ]
        loading.value = false
    }, 200)
})
</script>

<style lang="scss" scoped>
.swiper-box {
    border-radius: 15px
}

.swiper-img {
    height: 200px;
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
  
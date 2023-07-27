<template>
    <div class="block text-center" m="t-4">
        <el-carousel v-loading="loading" trigger="click" height="300px">
            <el-carousel-item v-for="item in imageList" :key="item.id" style="text-align: center">
                <img :src="item.url" :alt="item.name" style="height: 300px;width: 100%">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'

const imageList = ref<{
    name: string,
    url: string,
    id: number,
    [propsName: string]: any
}[]>([])
const loading = ref<boolean>(true)
var timer: number
onBeforeMount(() => {
    timer = setInterval(() => {
        imageList.value = [
            {
                name: "李白河校区",
                url: "https://www.suse.edu.cn/_rest/linker_allfile.ashx?parr=news%2c637977128339968113%2c.jpg%2c0%2c0%2c202307251615%2cc2248ebc34fa7df12e0bc0ef9bfe5469&said=636122975317834394",
                id: 1
            },
            {
                name: "汇东校区",
                url: "https://www.suse.edu.cn/_rest/linker_allfile.ashx?parr=news%2c637979947381621681%2c.jpg%2c0%2c0%2c202307251615%2cc2248ebc34fa7df12e0bc0ef9bfe5469&said=636122975317834394",
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
        clearInterval(timer)
    }, 500)
})
</script>

<style lang="scss" scoped>
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
  
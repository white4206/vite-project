<template>
    <!-- <el-row justify="center" class="content">
        <el-col :span="18">
            <div class="grid-content">
                <Swiper></Swiper>
            </div>
        </el-col>
    </el-row> -->
    <el-row justify="center" class="content">
        <el-col :span="18">
            <div class="grid-content">
                <h1>最新快讯</h1>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center" class="content">
        <el-col :span="18">
            <el-row justify="space-between" :gutter="25">
                <el-col :span="6" v-for="(item, index) in 4" :key="item.id" @click="handleClick(1)">
                    <div class="grid-content">
                        <ImgCard></ImgCard>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-row justify="center" class="content">
        <el-col :span="18">
            <div class="grid-content">
                <h1>公告列表</h1>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center" :gutter="20" class="content">
        <!-- <el-col :span="6">
            <div class="grid-content">
                <ImgCard></ImgCard>
            </div>
        </el-col> -->
        <el-col :span="18">
            <div class="grid-content">
                <NoticeContent></NoticeContent>
            </div>
        </el-col>
    </el-row>
</template>
    
<script setup>
import ImgCard from './components/ImgCard.vue'
import NoticeContent from './components/NoticeContent.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const ImgCardData = ref([])
const router = useRouter()
const handleClick = (id) => {
    router.push(`/notice/details/${id}`)
}
</script>

<style lang="scss" scoped>
.content {
    margin-bottom: 20px;
}

.grid-content {
    h1 {
        color: #95c7f4;
    }
}
</style>

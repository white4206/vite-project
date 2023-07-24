<template>
    <el-row justify="center" class="content">
        <el-col :span="24">
            <div class="grid-content">
                <Swiper></Swiper>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center" class="content">
        <el-col :span="24">
            <div class="grid-content">
                <h1>赛事快讯</h1>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center" :gutter="20" class="content">
        <el-col :span="6">
            <div class="grid-content">
                <ImgCard></ImgCard>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content">
                <NoticeContent></NoticeContent>
            </div>
        </el-col>
    </el-row>
</template>
    
<script setup>
import ImgCard from './components/ImgCard.vue'
import Swiper from './components/Swiper.vue';
import NoticeContent from './components/NoticeContent.vue';
</script>

<style lang="scss" scoped>
.content {
    margin-bottom: 10px;
}
.grid-content{
    h1{
        text-align: center;
        color: #95c7f4;
    }
}
</style>

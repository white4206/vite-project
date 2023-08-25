<template>
    <el-row justify="space-around">
        <el-col :span="18">
            <div class="grid-content">
                <Swiper></Swiper>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="2">
            <h1 style="text-align: center;color:#95C7F4">
                动态推送
            </h1>
        </el-col>
    </el-row>
    <el-row justify="space-around">
        <el-col :span="18">
            <HotCardSkeleton :loading="loading">
                <el-row :gutter="40">
                    <el-col :span="12" v-for="item in 3">
                        <div style="margin-bottom: 30px;">
                            <HotCard></HotCard>
                        </div>
                    </el-col>
                </el-row>
            </HotCardSkeleton>
        </el-col>
        <!-- <el-col :span="8" :push="1">
            <div class="grid-content">
                <LeftTable></LeftTable>
            </div>
        </el-col>
        <el-col :span="8" :pull="1">
            <div class="grid-content">
                <RightTable></RightTable>
            </div>
        </el-col> -->
    </el-row>
</template>
 
<script setup>
// import LeftTable from './components/LeftTable.vue'
// import RightTable from './components/RightTable.vue'
import HotCardSkeleton from './components/HotCardSkeleton.vue'
import HotCard from './components/HotCard.vue'
import Swiper from './components/Swiper.vue';
import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
    setTimeout(() => loading.value = false, 500)
})
</script>
<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
  
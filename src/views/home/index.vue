<template>
    <el-row justify="space-around">
        <el-col :span="18">
            <div class="grid-content">
                <Swiper></Swiper>
            </div>
        </el-col>
    </el-row>
    <el-row justify="space-around">
        <el-col :span="8" :push="1">
            <div class="grid-content">
                <LeftTable></LeftTable>
            </div>
        </el-col>
        <el-col :span="8" :pull="1">
            <div class="grid-content">
                <RightTable></RightTable>
            </div>
        </el-col>
    </el-row>
</template>
 
<script setup>
import LeftTable from './components/LeftTable.vue'
import RightTable from './components/RightTable.vue'
import Swiper from './components/Swiper.vue';
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
  
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
                <Table></Table>
            </div>
        </el-col>
        <el-col :span="8" :pull="1">
            <div class="grid-content">
                <Table></Table>
            </div>
        </el-col>
    </el-row>
</template>
 
<script setup>
import Table from '../../components/Table/Table.vue'
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

.el-col:nth-child(2n+1) {
    background-color: rgb(199, 213, 218);
}

.el-col:nth-child(2n) {
    background-color: rgb(66, 70, 71);
}
</style>
  
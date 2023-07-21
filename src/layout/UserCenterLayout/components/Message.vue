<template>
    <el-row justify="space-around">
        <el-col :span="8">
            <div class="grid-content">
                <Sidebar></Sidebar>
                <Pagination></Pagination>
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content message-content-box">
                <MessageContent></MessageContent>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
import Sidebar from './Sidebar.vue';
import Pagination from './Pagination.vue'
import MessageContent from './MessageContent.vue';
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

.message-content-box {
    height: 100%;
    border: 1px solid #dcdfe6;
    border-left: none;
}
</style>
  

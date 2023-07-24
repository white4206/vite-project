<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>项目1</span>
                <span>
                    <el-button type="primary" :icon="Edit" circle></el-button>
                    <el-button type="danger" :icon="Delete" circle></el-button>
                </span>
            </div>
        </template>
        <div class="text item">
            负责人:{{ dataList.name }}
        </div>
        <div class="text item">
            状态:{{ dataList.status }}
        </div>
    </el-card>
</template>

<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
const dataList = ref({
    name: "同学1",
    status: "通过"
})
</script>
<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 350px;
    height: 230px;
    margin: 10px 20px;
}
</style>
  
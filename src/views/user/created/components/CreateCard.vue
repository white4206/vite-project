<template>
    <el-card class="box-card" shadow="hover">
        <div>
            <el-icon :size="100" color="grey">
                <Plus />
            </el-icon>
        </div>
        <div>
            创建团队
        </div>
    </el-card>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
</script>
<style  lang="scss" scoped>
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
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 230px;
    justify-self: center;
    align-items: center;
    text-align: center;
    color: grey;
    margin: 10px 20px;
}
</style>
  
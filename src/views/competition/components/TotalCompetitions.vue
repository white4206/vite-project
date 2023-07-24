<template>
    <el-row justify="center">
        <el-col :span="18">
            <div class="grid-content">
                <Table></Table>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import Table from "./Table.vue"
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
  
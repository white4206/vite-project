<template>
    <el-row justify="center">
        <el-col :span="18">
            <div class="grid-content">
                <PageHeader></PageHeader>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="18">
            <div class="grid-content">
                <DetailContent></DetailContent>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from './PageHeader.vue';
import DetailContent from './DetailContent.vue';

const route = useRoute()

onMounted(() => {
    console.log(route.params.Cid)
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

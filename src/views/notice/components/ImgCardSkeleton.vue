<template>
    <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
            <div class="skeleton-title-box">
                <el-skeleton-item class="skeleton-title-item" variant="image" style="width: 100%" />
            </div>
            <div class="skeleton-content-box">
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 50%" />
                <el-skeleton-item class="skeleton-content-item" variant="div" style="width: 100%" />
            </div>
        </template>
        <template #default>
            <slot></slot>
        </template>
    </el-skeleton>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<style scoped>
.skeleton-title-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.skeleton-title-item {
    height: 300px;
}

.skeleton-content-box {
    display: flex;
    flex-direction: column;
}

.skeleton-content-item {
    height: 20px;
    margin-top: 10px;
}
</style>

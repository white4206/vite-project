<template>
    <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
            <div class="skeleton-title-box">
                <el-skeleton-item class="skeleton-title-item" variant="h1" style="width: 60%" />
            </div>
            <div class="skeleton-content-box">
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 60%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 90%" />
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

.skeleton-title-item {
    height: 30px;
    margin-right: 10px;
}

.skeleton-content-box {
    display: flex;
    flex-direction: column;
}

.skeleton-content-item {
    height: 30px;
    margin-top: 10px;
}
</style>

<template>
    <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
            <div class="skeleton-content-box">
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 80%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 50%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 70%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 80%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 50%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 70%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
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
.skeleton-content-box {
    display: flex;
    flex-direction: column;
}

.skeleton-content-item {
    height: 30px;
    margin-top: 10px;
}
</style>

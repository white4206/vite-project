<template>
    <el-skeleton style="width: 100%" animated>
        <template #template>
            <div class="skeleton-content-box">
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 60%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 55%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 70%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 65%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 50%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 60%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 80%" />
                <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 70%" />

            </div>
        </template>
        <template #default>
            <slot></slot>
        </template>
    </el-skeleton>
</template>
  
<script lang="ts" setup>
</script>

<style scoped>
.skeleton-content-box {
    display: flex;
    flex-direction: column;
}

.skeleton-content-item {
    height: 30px;
    margin-bottom: 20px;
}
</style>

<template>
    <el-skeleton style="width: 100%" animated>
        <template #template>
            <div class="skeleton-box" v-for="item in 2">
                <div class="skeleton-content-box">
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 75%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 25%" />
                </div>
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
.skeleton-box {
    background-color: #FFFFFF;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
}

.skeleton-content-box {
    display: flex;
    flex-direction: column;
}

.skeleton-content-item {
    height: 18px;
    margin-bottom: 10px;
}
.skeleton-content-item:last-child {
    margin-bottom: 0;
}
</style>

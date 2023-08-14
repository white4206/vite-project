<template>
    <el-skeleton style="width: 100%" animated>
        <template #template>
            <div class="skeleton-box" v-for="item in 2">
                <el-skeleton-item class="skeleton-title-item" variant="image" />
                <div class="skeleton-content-box">
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 75%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 25%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 35%" />
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

.skeleton-title-item {
    position: absolute;
    width: 200px;
    height: 120px;
    border-radius: 15px;
}

.skeleton-content-item {
    margin-left: 230px;
    height: 20px;
    margin-bottom: 20px;
}
</style>

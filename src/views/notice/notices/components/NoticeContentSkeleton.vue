<template>
    <el-skeleton style="width: 100%" animated>
        <template #template>
            <div class="skeleton-box">
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
            </div>
        </template>
        <template #default>
            <slot></slot>
        </template>
    </el-skeleton>
</template>

<style scoped>
.skeleton-box {
    background-color: #FFFFFF;
    border-radius: 15px;
    padding: 20px;
}

.skeleton-content-box {
    display: flex;
    flex-direction: column;
}

.skeleton-content-item {
    height: 30px;
    margin-bottom: 20px;
}
</style>

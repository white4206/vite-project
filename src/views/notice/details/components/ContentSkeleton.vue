<template>
    <el-skeleton style="width: 100%" animated>
        <template #template>
            <div class="skeleton-title-box">
                <el-skeleton-item class="skeleton-title-title" variant="h1" style="width: 70%" />
            </div>
            <div class="skeleton-content-box">
                <div class="skeleton-content-text">
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 90%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 60%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 70%" />
                </div>
                <div class="skeleton-content-text">
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 90%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 60%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 100%" />
                    <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 70%" />
                </div>
            </div>
        </template>
        <template #default>
            <slot></slot>
        </template>
    </el-skeleton>
</template>

<style scoped>
.skeleton-title-box {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
}

.skeleton-title-title {
    height: 50px;
    margin: 20px auto;
}

.skeleton-content-box {
    padding: 40px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    min-height: 500px;
}

.skeleton-content-item {
    height: 25px;
    margin-top: 10px;
}

.skeleton-content-text {
    padding: 20px 30px;
}
</style>

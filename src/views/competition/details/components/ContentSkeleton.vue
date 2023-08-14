<template>
    <el-skeleton style="width: 100%" animated>
        <template #template>
            <el-row>
                <el-col :span="24">
                    <div class="skeleton-title-box">
                        <el-skeleton-item class="skeleton-title-text" variant="h1" style="width: 70%" />
                        <el-skeleton-item class="skeleton-title-date" variant="h1" style="width: 30%" />
                        <el-skeleton-item class="skeleton-title-img" variant="image" />
                        <el-skeleton-item class="skeleton-title-button" variant="h1" style="width: 10%" />
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
                </el-col>
            </el-row>
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

.skeleton-title-text {
    height: 32px;
    margin: 50px 0 20px 0;
}

.skeleton-title-date {
    height: 20px;
    margin-bottom: 75px;
}

.skeleton-title-img {
    position: absolute;
    right: 5%;
    width: 200px;
    height: 200px;
    border-radius: 15px;
}

.skeleton-title-button {
    height: 30px;
    margin-bottom: 60px;
}

.skeleton-content-box {
    padding: 40px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    min-height: 400px;
}

.skeleton-content-item {
    height: 25px;
    margin-top: 10px;
}

.skeleton-content-text {
    padding: 20px 30px;
}
</style>

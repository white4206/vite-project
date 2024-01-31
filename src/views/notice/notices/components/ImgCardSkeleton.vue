<template>
    <el-skeleton style="width: 100%" animated>
        <template #template>
            <el-row :gutter="25">
                <el-col :span="6" v-for="item in 4">
                    <div class="skeleton-box">
                        <div class="skeleton-title-box">
                            <el-skeleton-item class="skeleton-title-item" variant="image" style="width: 100%" />
                        </div>
                        <div class="skeleton-content-box">
                            <el-skeleton-item class="skeleton-content-item" variant="h1" style="width: 50%" />
                            <el-skeleton-item class="skeleton-content-item" style="width: 100%" />
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
.skeleton-box {
    background-color: #FFFFFF;
    border-radius: 15px;
    padding: 10px;
}

.skeleton-title-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.skeleton-title-item {
    border-radius: 15px;
    height: 125px;
}

.skeleton-content-box {
    display: flex;
    flex-direction: column;
}

.skeleton-content-item {
    height: 15px;
    margin-top: 10px;
}
</style>

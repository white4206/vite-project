<template>
    <el-card shadow="never" class="card">
        <div class="card-content">
            <el-row>
                <el-col :span="9">
                    <img src="/src/assets/index.png" alt="" style="width: 100%;height: 150px;">
                </el-col>
                <el-col :span="15">
                    <div class="content-box">
                        <div class="title-text">这是一条很长很长很长很长很长特别长超级长的标题</div>
                        <div class="description-text">这是一条很长很长很长很长很长特别长超级长的描述</div>
                        <div class="date-text">2023-08-12</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script setup>

</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
    padding: 0px;
}
.card{
    border-radius: 15px;
    cursor: pointer;
}
.card-content {
    position: relative;
    height: 150px;
}

.content-box {
    padding: 20px;
}

.title-text {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}

.description-text {
    font-size: 14px;
}

.date-text {
    font-size: 12px;
    color: #909399;
    position: absolute;
    bottom: 10px;
}
</style>

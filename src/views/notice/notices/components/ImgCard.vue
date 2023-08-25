<template>
    <el-card class="card" shadow="hover">
        <img :src="'/src/assets/noticeImg.png'" :alt="data?.infotitle" class="image" height="150" />
        <div class="card-title-box">
            <div class="card-title">
                {{ data?.infotitle }}
            </div>
            <div style="text-align: right;font-size:14px;color:#909399">{{ data?.createtime }}</div>
        </div>
    </el-card>
</template>
  
<script setup>
const props = defineProps({
    data: {
        type: Object
    }
})
</script>
  
<style lang="scss" scoped>
::v-deep .el-card__body {
    padding: 0px;
}

.image {
    width: 100%;
    display: block;
}

.card-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.card {
    border-radius: 15px;
    cursor: pointer;
}

.card-title-box {
    padding: 10px;
}
</style>
  
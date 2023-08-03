<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span class="card-header-title">
                    <span><img :src="data.logo.url" :alt="data.name" width="25"></span>
                    {{ data.name }}
                </span>
                <span>
                    <el-button type="primary" plain>详情</el-button>
                </span>
            </div>
        </template>
        <div class="text item">
            负责人：{{ data.leader.name }}
        </div>
        <div class="text item">
            团队介绍：{{ data.desc }}
        </div>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
const dataList = ref({
    name: "同学1",
    status: "通过"
})
const props = defineProps({
    data: {
        type: Object
    }
})
</script>
<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header-title {
    display: flex;
    align-items: center;

    span {
        padding-right: 5px;
    }
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 350px;
    height: 230px;
    margin: 10px 20px;
}
</style>
  
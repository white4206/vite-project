<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span class="card-header-title">
                    <span><img :src="data!.logo.url" :alt="data!.name" width="25"></span>
                    {{ data!.name }}
                </span>
                <span>
                    <el-button type="primary" plain @click="handleOpen">详情</el-button>
                </span>
            </div>
        </template>
        <div class="text item">
            <el-tag type="warning"> 团队介绍：</el-tag>
            {{ data!.desc }}
        </div>
    </el-card>
    <detail v-model="isOpen" :id="id"></detail>
</template>
<script lang="ts" setup>
import detail from './detail/detail.vue';
import { ref } from 'vue'

const props = defineProps({
    data: {
        type: Object
    },
    id: {
        type: Number
    }
})
const isOpen = ref(false)

const handleOpen = () => {
    isOpen.value = true
}
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
  
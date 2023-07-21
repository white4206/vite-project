<template>
    <el-row justify="center">
        <el-col :span="18">
            <div class="grid-content">
                <PageHeader></PageHeader>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="18">
            <div class="grid-content">
                <DetailContent></DetailContent>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from './PageHeader.vue';
import DetailContent from './DetailContent.vue';

const route = useRoute()

onMounted(() => {
    console.log(route.params.Cid)
})
</script>

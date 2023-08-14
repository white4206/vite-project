<template>
    <el-row justify="center">
        <el-col :span="18">
            <div class="grid-content">
                <PageHeader :data="noticeData"></PageHeader>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="18">
            <div class="grid-content">
                <ContentSkeleton :loading="loading">
                    <DetailContent :data="noticeData"></DetailContent>
                </ContentSkeleton>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import ContentSkeleton from './components/ContentSkeleton.vue';
import { onMounted, ref, provide } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import PageHeader from './components/PageHeader.vue';
import DetailContent from './components/DetailContent.vue';
import axios from 'axios'

const route = useRoute()
const loading = ref(true)
const noticeData = ref()
const getData = () => {
    setTimeout(() => {
        axios.get(`http://localhost:3000/notice?id=${route.params.Nid}`)
            .then(res => {
                noticeData.value = res.data[0]
                loading.value = false
            })
            .catch(err => {
                ElMessage.error(err)
                console.log(err)
            })
    }, 1000)
}
onMounted(() => {
    getData()
})
</script>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>

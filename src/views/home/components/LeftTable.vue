<template>
    <LeftSkeleton :loading="loading">
        <el-table :data="tableData" stripe style="width: 100%" @row-click="handleClick($event)"
            :show-overflow-tooltip="true" :default-sort="{ prop: 'startDate', order: 'ascending' }">
            <el-table-column prop="startDate" sortable label="开始日期" width="110" />
            <el-table-column prop="name" label="比赛名称" />
        </el-table>
    </LeftSkeleton>
</template>
  
<script setup>
import LeftSkeleton from './LeftSkeleton.vue'
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
const tableData = ref([])
const loading = ref(true)
onMounted(() => {
    setTimeout(() => {
        axios.get("http://localhost:3000/competitions?_limit=5")
            .then(res => {
                tableData.value = res.data
                loading.value = false
            })
            .catch(err => {
                console.error(err)
                ElMessage.error(err)
            })
    }, 1000)
})
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/competition/details/${evt.id}`)
}
</script>

<style lang="scss" scoped>
.details-text {
    height: 30px;
}
</style>

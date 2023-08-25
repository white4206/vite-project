<template>
    <LeftSkeleton :loading="loading">
        <el-table class="table-box" :data="tableData" stripe @row-click="handleClick($event)" :show-overflow-tooltip="true"
            :default-sort="{ prop: 'startDate', order: 'ascending' }">
            <el-table-column prop="starttime" sortable label="开始日期" width="110" />
            <el-table-column prop="matchname" label="比赛名称" />
        </el-table>
    </LeftSkeleton>
</template>
  
<script setup>
import LeftSkeleton from './LeftSkeleton.vue'
import { ElMessage } from 'element-plus';
import { getCompetitions } from '@/api/competitions';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
const tableData = ref([])
const loading = ref(true)
onMounted(() => {
    getCompetitions(1)
        .then(res => {
            tableData.value = res.data.data
            tableData.value = tableData.value.map(item => {
                item.starttime = item.starttime.split('T')[0]
                return item
            })
            loading.value = false
        })
        .catch(err => console.error(err))
})
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/competition/competitions/details/${evt.id}&${evt.matchstate}`)
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__row {
    cursor: pointer;
}

.table-box {
    border-radius: 5px;
}
</style>

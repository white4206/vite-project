<template>
    <RightSkeleton :loading="loading">
        <el-table class="table-box" :data="tableData" stripe @row-click="handleClick($event)" :show-overflow-tooltip="true"
            :default-sort="{ prop: 'date', order: 'ascending' }">
            <el-table-column prop="infotitle" label="通知公告" />
            <el-table-column prop="createtime" sortable width="95" align="right">
                <template #default="scope">
                    <div class="date-text">
                        {{ scope.row.createtime }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </RightSkeleton>
</template>
  
<script setup>
import RightSkeleton from './RightSkeleton.vue'
import { ref, onMounted } from 'vue'
import { getNotices } from '@/api/notices'
import { useRouter } from 'vue-router'
const tableData = ref([])
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/notice/details/${evt.id}`)
}
const loading = ref(true)
onMounted(() => {
    getNotices(1)
        .then(res => {
            tableData.value = res.data.data
            loading.value = false
            tableData.value = tableData.value.map(item => {
                item.createtime = item.createtime.split(' ')[0]
                return item
            })
        })
        .catch(err => console.error(err))
})
</script>

<style lang="scss" scoped>
::v-deep .el-table__row {
    cursor: pointer;
}

.table-box {
    border-radius: 5px;
}

.date-text {
    font-size: 12px;
    color: gray;
}
</style>

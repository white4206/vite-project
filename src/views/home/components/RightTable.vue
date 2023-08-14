<template>
    <RightSkeleton :loading="loading">
        <el-table class="table-box" :data="tableData" stripe @row-click="handleClick($event)" :show-overflow-tooltip="true"
            :default-sort="{ prop: 'date', order: 'ascending' }">
            <el-table-column prop="title" label="通知公告" />
            <el-table-column prop="date" sortable width="95" align="right">
                <template #default="scope">
                    <div class="date-text">
                        {{ scope.row.date }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </RightSkeleton>
</template>
  
<script setup>
import RightSkeleton from './RightSkeleton.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'
const tableData = ref([])
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/notice/details/${evt.id}`)
}
const loading = ref(true)
onMounted(() => {
    setTimeout(() => {
        axios.get("http://localhost:3000/notice?_limit=10")
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

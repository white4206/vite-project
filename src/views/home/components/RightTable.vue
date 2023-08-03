<template>
    <RightSkeleton :loading="loading">
        <el-table :data="tableData" stripe style="width: 100%" @row-click="handleClick($event)"
            :show-overflow-tooltip="true" :default-sort="{ prop: 'date', order: 'ascending' }">
            <el-table-column prop="title" label="通知公告" />
            <el-table-column prop="date" sortable width="90" align="right">
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
import axios from 'axios'
import { useRouter } from 'vue-router'
const tableData = ref([])
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/notice/${evt.id}`)
}
const loading = ref(true)
onMounted(() => {
    setTimeout(() => {
        axios.get("http://localhost:3000/notice?_limit=10")
            .then(res => {
                tableData.value = res.data
                loading.value = false
            })
            .catch(err => console.log(err))
        // let res = await axios.get("http://localhost:3000/notice?_limit=10")
        // tableData.value = res.data
        // console.log(tableData.value)
        // loading.value = false
        // clearInterval(timer)
    }, 2000)
})
</script>

<style lang="scss" scoped>
.date-text {
    font-size: 12px;
    color: gray;
}
</style>

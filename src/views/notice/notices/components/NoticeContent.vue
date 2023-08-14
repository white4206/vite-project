<template>
    <NoticeContentSkeleton :loading="loading">
        <div class="table-box">
            <el-table :data="filterNoticeList" v-loading="loading" :show-overflow-tooltip="true"
                @row-click="handleClick($event)" :default-sort="{ prop: 'date', order: 'ascending' }" stripe
                empty-text="未查询到相关公告信息">
                <el-table-column prop="title" label="比赛名称" />
                <el-table-column width="225" label="比赛名称">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="搜索比赛名称" />
                    </template>
                </el-table-column>
                <el-table-column prop="date" sortable label="选项" align="center" width="95">
                    <template #default="scope">
                        <div class="date-text">
                            {{ scope.row.date }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </NoticeContentSkeleton>
</template>
  
<script lang="ts" setup>
import NoticeContentSkeleton from './NoticeContentSkeleton.vue';
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const noticeList = ref<{
    title: string
    author: string
    content: string
    id: number
    [propsName: string]: any
}[]>([])
const loading = ref<boolean>(true)
const getData = () => {
    setTimeout(() => {
        axios.get("http://localhost:3000/notice")
            .then(res => {
                noticeList.value = res.data
                loading.value = false
            })
            .catch(err => {
                console.error(err)
                ElMessage.error(err)
            })

    }, 1000)
}
onMounted(() => {
    getData()
})
const search = ref('')
const filterNoticeList = computed(() => {
    return noticeList.value.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase())
    )
}
)
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/notice/details/${evt.id}`)
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__row {
    cursor: pointer;
}

.date-text {
    font-size: 12px;
    color: #909399;
}

.table-box {
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 15px;
}

.card-title {
    padding-left: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>

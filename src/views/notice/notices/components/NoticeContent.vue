<template>
    <NoticeContentSkeleton :loading="loading">
        <div class="table-box">
            <el-table :data="filterNoticeList" v-loading="loading" :show-overflow-tooltip="true"
                @row-click="handleClick($event)" :default-sort="{ prop: 'date', order: 'ascending' }" stripe
                empty-text="未查询到相关公告信息">
                <el-table-column prop="infotitle" label="公告名称" />
                <el-table-column width="225" label="公告名称">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="搜索公告名称" />
                    </template>
                </el-table-column>
                <el-table-column prop="createtime" sortable label="日期" align="center" width="95">
                    <template #default="scope">
                        <div class="date-text">
                            {{ scope.row.createtime }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </NoticeContentSkeleton>
    <el-row justify="center" :gutter="20" class="content">
        <el-col :span="24">
            <el-card class="pagination-card" shadow="never">
                <el-pagination layout="prev, pager, next" :pager-count="9" :default-page-size="10" :total="totalCount"
                    v-model:current-page="currentPage" @update:current-page="handlePageChange" />
            </el-card>
        </el-col>
    </el-row>
</template>
  
<script setup>
import NoticeContentSkeleton from './NoticeContentSkeleton.vue';
import { ref, onMounted, computed } from 'vue'
import { getNotices } from '@/api/notices.js'
import { useRouter } from 'vue-router'

const totalCount = ref(1)
const noticeList = ref([])
const loading = ref(true)
const getData = (page = 1) => {
    getNotices(page)
        .then(res => {
            if (res.data.code === 200) {
                noticeList.value = res.data.data
                noticeList.value = noticeList.value.map(item => {
                    item.createtime = item.createtime.split(' ')[0]
                    return item
                })
                loading.value = false
                totalCount.value = Number(res.data.msg.split(":")[1])
            }
        })
        .catch(err => console.error(err))
}
onMounted(() => {
    getData()
})
const search = ref('')
const filterNoticeList = computed(() => {
    return noticeList.value.filter(
        (data) =>
            !search.value ||
            data.infotitle.toLowerCase().includes(search.value.toLowerCase())
    )
}
)
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/notice/details/${evt.id}`)
}
const currentPage = ref()
const handlePageChange = () => {
    document.documentElement.scrollTop = 0
    loading.value = true
    getData(currentPage.value)
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

.pagination-card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 15px;
    margin-top: 20px;
}
</style>

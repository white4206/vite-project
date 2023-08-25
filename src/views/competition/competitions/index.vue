<template>
    <el-row justify="center">
        <el-col :span="store.role === '2' ? 16 : 12">
            <div class="top-content" v-if="store.role === '1'">
                <h1>竞赛列表</h1>
            </div>
        </el-col>
        <el-col :span="store.role === '2' ? 8 : 6">
            <div class="top-content">
                <el-input v-model="search" size="default" placeholder="搜索比赛名称" :suffix-icon="Search" />
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="store.role === '2' ? 24 : 18">
            <div class="competition-box" v-loading="loading">
                <PageSkeleton :loading="firstLoading">
                    <template v-if="JSON.stringify(filterCompetitionData) !== '[]'">
                        <el-row v-for="(item, index) in filterCompetitionData" :key="item.id" justify="center">
                            <el-col>
                                <el-card class="competition-card" shadow="hover"
                                    @click="handleClick(item.id, item.matchstate)">
                                    <div class="grid-content">
                                        <CompetitionCard :data="item"></CompetitionCard>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-else>
                        <el-row justify="center">
                            <el-col>
                                <el-card class="competition-card" shadow="hover">
                                    <el-empty description="未找到相关比赛" />
                                </el-card>
                            </el-col>
                        </el-row>
                    </template>
                </PageSkeleton>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="store.role === '2' ? 24 : 18">
            <el-row justify="center">
                <el-col>
                    <el-card class="pagination-card" shadow="never">
                        <el-pagination background layout="prev, pager, next" :pager-count="9" :default-page-size="10"
                            :total="totalCount" v-model:current-page="currentPage"
                            @update:current-page="handlePageChange" />
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script setup>
import PageSkeleton from './components/PageSkeleton.vue';
import CompetitionCard from './components/CompetitionCard.vue';
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getCompetitions } from '@/api/competitions.js'
import useLoginStore from '@/store/loginStore';

const store = useLoginStore()
const loading = ref(false)
const firstLoading = ref(true)
const competitionData = ref([])
const totalCount = ref(0)
const getData = (page = 1) => {
    getCompetitions(page)
        .then(res => {
            if (res.data.code === 200) {
                competitionData.value = res.data.data
                competitionData.value = competitionData.value?.map(item => {
                    item.starttime = item.starttime.split('T')[0]
                    item.deadline = item.deadline.split('T')[0]
                    return item
                })
                totalCount.value = Number(res.data.msg.split(":")[1])
                firstLoading.value = false
                loading.value = false
            }
        })
        .catch(err => console.error(err))
}
onMounted(() => {
    getData()
})
const currentPage = ref()
const handlePageChange = () => {
    document.documentElement.scrollTop = 0
    loading.value = true
    getData(currentPage.value)
}
const search = ref('')
const filterCompetitionData = computed(() => {
    return competitionData.value?.filter(
        (data) =>
            !search.value ||
            data.matchname.toLowerCase().includes(search.value.toLowerCase())
    )
}
)
const router = useRouter()
const handleClick = (id, state) => {
    router.push(`/competition/competitions/details/${id}&${state}`)
}
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
    cursor: pointer;
}

.top-content {
    color: #95c7f4;
    padding-bottom: 20px;
    // margin-top: 50px;
    user-select: none;
}

.competition-card {
    border-radius: 15px;
}

.competition-box {
    min-height: 160px;
    border-radius: 15px;
}

.pagination-card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 15px;
    margin-top: 20px;
}
</style>
  
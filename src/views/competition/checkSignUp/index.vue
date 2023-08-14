<template>
    <el-row justify="center">
        <el-col :span="16" />
        <el-col :span="8">
            <div class="top-content">
                <el-input v-model="search" size="default" placeholder="搜索比赛名称" :suffix-icon="Search" />
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="24">
            <div class="competition-box" v-loading="loading">
                <PageSkeleton :loading="firstLoading">
                    <template v-if="JSON.stringify(filterCompetitionData) !== '[]'">
                        <el-row v-for="(item, index) in filterCompetitionData" :key="item.id" justify="center">
                            <el-col>
                                <el-card class="competition-card" shadow="hover" @click="handleClick(item.id)">
                                    <CheckCompetitionCard :data="item"></CheckCompetitionCard>
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
        <el-col :span="24">
            <el-row justify="center">
                <el-col>
                    <el-card class="pagination-card" shadow="never">
                        <el-pagination background layout="prev, pager, next" :default-page-size="5" :total="totalCount"
                            v-model:current-page="currentPage" @update:current-page="handlePageChange" />
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup >
import PageSkeleton from './components/CheckPageSkeleton.vue';
import CheckCompetitionCard from './components/CheckCompetition.vue';
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import useUserStore from '../../../store/userStore'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'


const store = useUserStore()
const loading = ref(false)
const firstLoading = ref(true)
const competitionData = ref<{
    startDate: string,
    finishDate: string,
    name: string,
    desc: string,
    id: number,
}[]>()
const totalCount = ref(0)
const getData = (page = 1) => {
    setTimeout(() => {
        axios.get(`http://localhost:3000/competitions?_page=${page}&_limit=5`)
            .then(res => {
                let tempCompetitions
                tempCompetitions = []
                res.data.map(competitionItem => {
                    competitionItem.signUpList.map(item => {
                        if (item.signUpStatus === 'waiting' && item.teacherId === store.userInformation.id && tempCompetitions.indexOf(competitionItem) === -1)
                            tempCompetitions.push(competitionItem)
                    })
                })
                totalCount.value = Number(res.headers["x-total-count"])
                competitionData.value = tempCompetitions
                // console.log(competitionData.value)
                // res.data
                firstLoading.value = false
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
const currentPage = ref()
const handlePageChange = () => {
    document.documentElement.scrollTop = 0
    loading.value = true
    getData(currentPage.value)
}
const search = ref('')
const filterCompetitionData = computed(() => {
    return competitionData.value!.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
}
)
const router = useRouter()
const handleClick = (id) => {
    router.push(`/competition/checkSignUp/details/${id}`)
}
</script>

<style lang="scss" scoped>
/* .checkSignUp {
    border-radius: 15px;
    background-color: #FFFFFF;
    min-height: 100%
} */

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
    //margin-top: 50px;
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

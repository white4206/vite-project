<template>
  <el-row justify="center">
    <el-col :span="24">
      <el-form class="queryParams" :model="queryParams" label-width="120px" label-position="left">
        <el-form-item label="比赛规模:" prop="scale">
          <el-radio-group v-model="queryParams.scale">
            <el-radio-button v-for="item in scaleList" :label="item.label"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="比赛类型:" prop="type">
          <el-radio-group v-model="queryParams.type">
            <el-radio-button v-for="item in typeList" :label="item.label"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="竞赛时间:" prop="time">
          <el-radio-group v-model="queryParams.time">
            <el-radio-button v-for="item in timeList" :label="item.label"/>
          </el-radio-group>
          <div style="margin-left: 50px">
            <el-date-picker
                v-model="queryParams.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row justify="space-between">
    <el-col :span="16">
      <div class="competition-box" v-loading="loading">
        <PageSkeleton :loading="firstLoading">
          <template v-if="JSON.stringify(competitionData) !== '[]'">
            <el-row v-for="item in competitionData" :key="item.id" justify="center">
              <el-col>
                <el-card class="competition-card" shadow="hover"
                         @click="handleClick(item.id, item.matchState)">
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
                  <el-empty description="未找到相关比赛"/>
                </el-card>
              </el-col>
            </el-row>
          </template>
        </PageSkeleton>
      </div>
    </el-col>
    <el-col :span="7">
      <SideCard/>
    </el-col>
  </el-row>
  <el-row justify="center">
    <el-col>
      <el-row justify="center">
        <el-col>
          <el-card class="pagination-card" shadow="never">
            <el-pagination layout="prev, pager, next" :pager-count="9" :default-page-size="10"
                           :total="totalCount" v-model:current-page="currentPage"
                           @update:current-page="handlePageChange"/>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import PageSkeleton from './PageSkeleton.vue';
import CompetitionCard from './CompetitionCard.vue';
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {getCompetitions} from '@/api/competitions.js'
import useLoginStore from '@/store/loginStore.js';
import SideCard from "@/views/competition/competition/components/SideCard.vue";

const store = useLoginStore()
const queryParams = ref({
  scale: "全部",
  type: "全部",
  time: "全部"
})
const scaleList = ref([
  {label: "全部",},
  {label: "校级",},
  {label: "市级",},
  {label: "省级",},
  {label: "国家",},
])
const typeList = ref([
  {label: "全部",},
  {label: "类型1",},
  {label: "类型2",},
  {label: "类型3",}
])
const timeList = ref([
  {label: "全部",},
  {label: "一周内",},
  {label: "一月内",},
])
const loading = ref(false)
const firstLoading = ref(true)
const competitionData = ref([])
const totalCount = ref(0)

const getData = (page = 1) => {
  getCompetitions(page)
      .then(res => {
        if (res.code === 200) {
          competitionData.value = res.data
          competitionData.value = competitionData.value?.map(item => {
            item.startTime = item.startTime.split('T')[0]
            item.deadline = item.deadline.split('T')[0]
            return item
          })
          totalCount.value = Number(res.msg.split(":")[1])
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
const router = useRouter()
const handleClick = (id, state) => {
  router.push(`/competition/competitions/details/${id}&${state}`)
}
</script>

<style lang="scss" scoped>
.queryParams {
  margin-top: 20px;
}

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
  user-select: none;
}

.competition-card {
  border-radius: 15px;
}

.competition-card.competition-card:deep(.el-card__body) {
  padding: 0;
}

.pagination-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 15px;
  margin-top: 20px;
  border: none;
}
</style>
  
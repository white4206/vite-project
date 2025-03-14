<template>
  <el-row justify="center">
    <el-col :span="24">
      <el-form class="queryParams" :model="queryParams" label-width="120px" label-position="left">
        <el-form-item label="比赛规模:" prop="scale">
          <el-radio-group v-model="queryParams.scale" @change="handleChangeScale">
            <el-radio-button v-for="item in scaleList" :label="item.label" :value="item.label"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="比赛类型:" prop="type">
          <el-radio-group v-model="queryParams.matchType" @change="handleChangeType">
            <el-radio-button v-for="item in typeList" :label="item.dictValue" :value="item.dictValue"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="竞赛时间:" prop="time">
          <el-radio-group v-model="queryParams.time" @change="handleChangeTime">
            <el-radio-button v-for="item in timeList" :label="item.label" :value="item.label"/>
          </el-radio-group>
          <div style="margin-left: 50px">
            <el-date-picker
                @change="handleChangeTime"
                v-model="queryParams.time"
                :clearable="false"
                type="daterange"
                value-format="YYYY-MM-DD"
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
                <el-card class="competition-card" shadow="never"
                         @click="handleClick(item.id, item.matchState)">
                  <div class="grid-content">
                    <CompetitionCard :data="item"></CompetitionCard>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row justify="center">
              <el-col>
                <el-card class="pagination-card" shadow="never">
                  <el-pagination background layout="prev, pager, next" :pager-count="9" :default-page-size="10"
                                 :total="totalCount" v-model:current-page="currentPage"
                                 @update:current-page="handlePageChange"/>
                </el-card>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row justify="center">
              <el-col>
                <el-card class="competition-card" shadow="never">
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
</template>

<script setup>
import PageSkeleton from './PageSkeleton.vue';
import CompetitionCard from './CompetitionCard.vue';
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {getCompetitions, getCompetitionType} from '@/api/competition.js'
import useLoginStore from '@/store/loginStore.js';
import SideCard from "@/views/competition/competition/components/SideCard.vue";

const store = useLoginStore()
const queryParams = ref({
  scale: "全部",
  matchType: "全部",
  time: "全部"
})
const scaleList = ref([
  {label: "全部",},
  {label: "校级",},
  {label: "市级",},
  {label: "省级",},
  {label: "国家级",},
])
const typeList = ref([])
const timeList = ref([
  {label: "全部",},
  {label: "一周内",},
  {label: "一月内",},
])
const loading = ref(false)
const firstLoading = ref(true)
const competitionData = ref([])
const totalCount = ref(0)
const handleChangeTime = () => {
  loading.value = true
  getData(1)
}
const timeMap = () => {
  // 获取当前日期
  let nowDate = new Date().toLocaleDateString("af");
  // 获取7天前的时间
  let previous7Date = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000).toLocaleDateString("af")
  // 获取30天前的时间
  let previous30Date = new Date(new Date().getTime() - 30 * 24 * 3600 * 1000).toLocaleDateString("af")
  switch (queryParams.value.time) {
    case "全部":
      return {start: null, end: null};
    case "一周内" :
      return {start: previous7Date, end: nowDate}
    case "一月内" :
      return {start: previous30Date, end: nowDate}
    default :
      return {start: queryParams.value.time[0], end: queryParams.value.time[1]}
  }
}
const handleChangeScale = () => {
  loading.value = true
  getData(1)
}
const handleChangeType = () => {
  loading.value = true
  getData(1)
}
const getData = (page = 1) => {
  getCompetitions({
    matchType: queryParams.value.matchType === "全部" ? null : queryParams.value.matchType,
    scale: queryParams.value.scale === "全部" ? null : queryParams.value.scale,
    start: queryParams.value.time === "全部" ? null : timeMap().start,
    end: queryParams.value.time === "全部" ? null : timeMap().end,
  }, page)
      .then(res => {
        if (res.code === 200) {
          competitionData.value = res.data.map(item => {
            return {
              ...item,
              headImage: import.meta.env.VITE_BASE_URL + item.headImage
            }
          })
          competitionData.value = competitionData.value.map(item => {
            item.startTime = item.startTime.split('T')[0]
            item.deadline = item.deadline.split('T')[0]

            if (new Date() - new Date(item.deadline) > 0)
              item.matchState = -1
            else if (new Date() - new Date(item.startTime) < 0)
              item.matchState = 0
            else
              item.matchState = 1

            return item
          })

          totalCount.value = Number(res.msg.split(":")[1])
          firstLoading.value = false
          loading.value = false
        }
      })
}
onMounted(() => {
  getCompetitionType().then(res => {
    typeList.value.push({dictValue: "全部"})
    res.data.forEach(item => {
      typeList.value.push(item)
    })
  })
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
  
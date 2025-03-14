<template>
  <el-main style="padding: 0;">
    <el-row justify="space-around" style="margin-bottom: 0">
      <el-col :span="24">
        <div class="grid-content">
          <Swiper></Swiper>
        </div>
      </el-col>
    </el-row>
  </el-main>
  <div style="background-color: #FFFFFF;">
    <el-row justify="space-around" style="max-width: 1500px;margin: 0 auto;padding: 20px;">
      <el-col :span="18">
        <el-row :gutter="100" justify="space-between">
          <el-col :span="10">
            <el-card shadow="never" class="hotCard">
              <template #header>
                <div style="display: flex;align-items: center;">
                  <span style="font-weight: bold;font-size: 18px;color:#337ecc ;">推荐文章</span>
                  <el-icon color="#c8c9cc">
                    <BottomRight/>
                  </el-icon>
                </div>
              </template>
              <RecommendedSkeleton :loading="recommendedLoading">
                <el-carousel class="swiper-box" v-loading="false" trigger="click" height="200px"
                             indicator-position="none" style="border-radius: 5px">
                  <el-carousel-item v-for="item in hotSwiperList" :key="item.id">
                    <HotCard :data="item" @click="handleGoToNotice(item.targetId)"></HotCard>
                  </el-carousel-item>
                </el-carousel>
              </RecommendedSkeleton>
            </el-card>
          </el-col>
          <el-col :span="14">
            <el-card shadow="never" class="hotCard">
              <template #header>
                <div style="display: flex;align-items: center;">
                  <span style="font-weight: bold;font-size: 18px;color:#337ecc ;">通知动态</span>
                  <el-icon color="#c8c9cc">
                    <BottomRight/>
                  </el-icon>
                </div>
              </template>
              <NotificationSkeleton :loading="notificationLoading">
                <el-table :show-header="false" :data="notifyUpdatesList" stripe
                          @row-click="handleClickNotification($event)"
                          :show-overflow-tooltip="true" :default-sort="{ prop: 'createTime', order: 'descending' }">
                  <el-table-column prop="infoTitle" label="通知公告"/>
                  <el-table-column prop="createTime" sortable width="110" align="center"/>
                </el-table>
              </NotificationSkeleton>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row justify="space-around" style="max-width: 1500px;margin: 0 auto;padding: 20px;">
      <el-col :span="18">
        <el-card shadow="never" class="hotCard">
          <template #header>
            <div style="display: flex;align-items: center;">
              <span style="font-weight: bold;font-size: 18px;color:#337ecc ;">外部竞赛推荐</span>
              <el-icon color="#c8c9cc">
                <BottomRight/>
              </el-icon>
            </div>
          </template>
          <LinkCardSkeleton :loading="false">
            <el-row :gutter="20" justify="start">
              <el-col :span="8" v-for="item in linkCompetitionList">
                <el-card shadow="never" class="linkCard">
                  <div class="container">
                    <div>
                      <img class="linkImage" :src="item.homeImage" alt=""
                           style="width: 100%;height: 200px;border-radius: 5px" @click="handleLinkTo(item.url)">
                      <div class="title">
                        <div class="title-text">{{ item.title }}</div>
                        <div class="title-content">
                          {{ item.content }}
                        </div>
                        <div class="title-bottom">
                          <span class="title-bottom-tag">省赛</span>
                          <div class="title-bottom-info">
                            <el-icon>
                              <User/>
                            </el-icon>
                            <span> {{ '参赛人数 ' + '...' }}</span>
                            <el-icon>
                              <OfficeBuilding/>
                            </el-icon>
                            <span>{{ '覆盖院校 ' + '...' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </LinkCardSkeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import LinkCardSkeleton from './components/LinkCardSkeleton.vue'
import HotCard from './components/HotCard.vue'
import Swiper from './components/Swiper.vue';
import {BottomRight, User, OfficeBuilding} from '@element-plus/icons-vue'
import {ref, onMounted} from 'vue'
import {getAllPush, getLinkCompetition, getNotifyUpdates} from '@/api/home.js'
import RecommendedSkeleton from "@/views/home/components/RecommendedSkeleton.vue";
import NotificationSkeleton from "@/views/home/components/NotificationSkeleton.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const loading = ref(true)
const linkLoading = ref(true)
const notificationLoading = ref(false)
const recommendedLoading = ref(true)
const hotSwiperList = ref([])
const notifyUpdatesList = ref([])
const linkCompetitionList = ref([])

const handleLinkTo = (url) => {
  window.open(url)
}
const handleClickNotification = (row) => {
  router.push(`/notice/details/${row.id}`)
}
const handleGoToNotice=(targetId)=>{
  router.push(`/notice/details/${targetId}`)
}
onMounted(() => {
  getAllPush().then(res => {
    hotSwiperList.value = res.data.map(item => {
      return {
        ...item,
        headImage: import.meta.env.VITE_BASE_URL + item.headImage
      }
    })
    recommendedLoading.value = false
  })
  getNotifyUpdates().then(res => {
    notifyUpdatesList.value = res.data.map(item => {
      return {
        ...item,
        createTime: item.createTime.split(' ')[0]
      }
    }).sort((a, b) => {
      return Date.parse(b.createTime) - Date.parse(a.createTime)
    })
    linkLoading.value = false
  })
  getLinkCompetition().then(res => {
    linkCompetitionList.value = res.data.map(item => {
      return {
        ...item,
        homeImage: import.meta.env.VITE_BASE_URL + item.homeImage
      }
    })
  })
})
</script>
<style lang="scss" scoped>
.el-main{
  max-width: none;
}
:deep(.cell) {
  cursor: pointer;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.hotCard {
  border: none;
}

.hotCard:deep(.el-card__header) {
  padding: 10px;
}

.hotCard:deep(.el-card__body) {
  padding: 0;
  padding-top: 10px;
}

.linkCard {
  margin-bottom: 20px;
  transition: .4s;
}

.linkImage:hover {
  cursor: pointer;
}

.linkCard:hover .linkImage {
  scale: 1.05;
  transition: .4s;
}

.linkCard:deep(.el-card__body) {
  padding: 0;
}

.title {
  padding: 10px;

  .title-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }

  .title-content {
    color: #909399;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
    min-height: 40px;
  }

  .title-bottom {
    display: flex;
    justify-content: space-between;

    .title-bottom-tag {
    }

    .title-bottom-info {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #909399;

      span {
        margin-right: 10px;
      }
    }
  }

}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
  
<template>
  <el-main>
    <el-row justify="space-around">
      <el-col :span="20">
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
                    <HotCard :data="item"></HotCard>
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
                <el-table :show-header="false" :data="tableData" stripe @row-click="handleClick($event)"
                          :show-overflow-tooltip="true" :default-sort="{ prop: 'date', order: 'ascending' }">
                  <el-table-column prop="infoTitle" label="通知公告"/>
                  <el-table-column prop="createTime" sortable width="95" align="right">
                    <template #default="scope">
                      <div class="date-text">
                        {{ scope.row.createTime }}
                      </div>
                    </template>
                  </el-table-column>
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
              <el-col :span="8" v-for="item in 5">
                <el-card shadow="never" class="linkCard">
                  <div class="container">
                    <div>
                      <img src="/src/assets/notFound.jpg" alt="" style="width: 100%;height: 200px;border-radius: 5px">
                      <div class="title">
                        <div class="title-text">{{ item.title + "" }}</div>
                        <div class="title-content">
                          {{ item.content + "" }}
                        </div>
                        <div class="title-bottom">
                          <span class="title-bottom-tag">省赛</span>
                          <div class="title-bottom-info">
                            <el-icon>
                              <User/>
                            </el-icon>
                            <span> {{ '参赛人数 ' + 1023 }}</span>
                            <el-icon>
                              <OfficeBuilding/>
                            </el-icon>
                            <span>{{ '覆盖院校 ' + 13 }}</span>
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
import {getAllPush, getNotifyUpdates} from '@/api/home.js'
import RecommendedSkeleton from "@/views/home/components/RecommendedSkeleton.vue";
import NotificationSkeleton from "@/views/home/components/NotificationSkeleton.vue";

const tableData = ref([])
const loading = ref(true)
const linkLoading = ref(true)
const notificationLoading = ref(false)
const recommendedLoading = ref(true)

const hotSwiperList = ref([])
const notifyUpdatesList = ref([])

onMounted(() => {
  getAllPush().then(res => {
    console.log(res)
    hotSwiperList.value = res.data
    recommendedLoading.value = false
  })
  getNotifyUpdates().then(res => {
    console.log(res)
    table.value = res.data
    linkLoading.value = false
  })
  for (let i = 1; i <= 5; i++) {
    tableData.value.push({
      infoTitle: "我是标题...",
      createTime: "2024-01-01"
    })
  }
})
</script>
<style lang="scss" scoped>
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
  
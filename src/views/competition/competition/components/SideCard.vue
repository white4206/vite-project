<template>
  <div>
    <el-card class="side-card" shadow="never">
      <template #header>
        <h3>热门竞赛 <span style="color: #F56C6C">Top10</span></h3>
      </template>
      <HotRaceSkeleton :loading="loading">
        <div class="hotCompetition" v-for="item in 10">
          <div class="rankingNumber">{{ item }}</div>
          <span class="text">2024年全国大学生英语竞赛2024年全国大学生英语竞赛</span>
          <div class="heat">838.9万</div>
        </div>
      </HotRaceSkeleton>
    </el-card>
    <el-card class="side-card" shadow="never">
      <template #header>
        <h3>优秀学生 <span style="color: #F56C6C">Top5</span></h3>
      </template>
      <OutstandingSkeleton :loading="loading">
        <div v-for="item in 5" :key="item.id" class="recommended-author">
          <div class="recommended-author-info">
            <div class="recommended-author-img-box">
              <img :src="'src/assets/head.jpg'" :alt="'wHitE_'" class="recommended-author-img">
            </div>
            <div>
              <div class="recommended-author-name">{{ "wHitE_" }}</div>
              <div class="recommended-author-desc">{{ "..." }}</div>
            </div>
          </div>
        </div>
      </OutstandingSkeleton>
    </el-card>
    <el-card class="side-card" shadow="never">
      <template #header>
        <div style="display: flex;justify-content: space-between">
          <h3>竞赛交流群 <span style="color: #F56C6C">Hot</span></h3>
          <el-radio-group v-model="chatGroup" size="small">
            <el-radio-button label="QQ群"/>
            <el-radio-button label="微信群"/>
          </el-radio-group>
        </div>
      </template>
      <GroupSkeleton :loading="loading">
        <ul>
          <li class="hotChatGroup" v-for="item in 5">
            <span class="text">2024年全国大学生英语竞赛</span>
            <el-popover placement="left" :width="300" trigger="hover" :hide-after="0">
              <template #reference>
                <el-button class="join-btn" size="small" type="primary" plain>加入</el-button>
              </template>
              <template #default>
                <div class="popover-box">
                  <div class="QR-code">
                    <img src="https://cdn3.saikr.com/img/sidebar-codes/xiaoyuan_icon@2x.png?v=2024012908" alt="QR code">
                  </div>
                  <div class="desc">
                    <div class="desc-title">
                      {{ "扫码加入交流" + chatGroup }}
                    </div>
                    <div class="desc-content">
                      请备注： 姓名+学校+年纪以便审核进去资格，未注明则无法进群
                    </div>
                  </div>
                </div>
              </template>
            </el-popover>
          </li>
        </ul>
      </GroupSkeleton>
    </el-card>
  </div>
</template>
<script setup>
import HotRaceSkeleton from "@/views/competition/competition/components/HotRaceSkeleton.vue";
import OutstandingSkeleton from "@/views/competition/competition/components/OutstandingSkeleton.vue";
import GroupSkeleton from "@/views/competition/competition/components/GroupSkeleton.vue";
import {ref, onMounted} from "vue";

const chatGroup = ref("QQ群")
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>
<style scoped lang="scss">

.side-card {
  margin-bottom: 20px;
}

.hotCompetition {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.rankingNumber {
  width: 20px;
  text-align: center;
  font-weight: bold;
  padding: 0 10px;
  color: #909399;
}

.text {
  flex: 1;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin-right: 10px;
}

.heat {
  width: 50px;
  font-size: 12px;
  color: #909399;
  margin-right: 10px;
}

.hotCompetition:nth-child(1) .rankingNumber {
  color: #F56C6C;
}

.hotCompetition:nth-child(2) .rankingNumber {
  color: #E6A23C;
}

.hotCompetition:nth-child(3) .rankingNumber {
  color: #67C23A;
}

.recommended-author {
  padding: 0 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

.recommended-author-info {
  display: flex;
}

.recommended-author-img-box {
  width: 45px;
  height: 45px;
  margin-right: 10px;

  .recommended-author-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}

.recommended-author-name {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.recommended-author-desc {
  font-size: 12px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.hotChatGroup {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .text {
    font-size: 14px;
  }
}

.hotChatGroup:before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #c6e2ff;
  border-radius: 1px;
  margin: 0 10px;
}

.join-btn {
  margin-right: 10px;
  background-color: transparent;
}

.join-btn:focus, .join-btn:hover {
  color: #409EFF;
}

.popover-box {
  display: flex;
}

.QR-code {
  width: 125px;
  height: 125px;

  img {
    width: 125px;
    height: 125px;
  }
}

.desc {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-left: 10px;

  .desc-title {
    color: #303133;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .desc-content {
    font-size: 12px;
    color: #909399;
  }
}
</style>
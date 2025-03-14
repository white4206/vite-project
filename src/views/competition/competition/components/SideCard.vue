<template>
  <div>
    <el-card class="side-card" shadow="never">
      <template #header>
        <h3>热门竞赛 <span style="color: #F56C6C">Top10</span></h3>
      </template>
      <HotRaceSkeleton :loading="HotCompetitionLoading">
        <div class="hotCompetition" v-for="(item,index) in HotCompetitionList">
          <div class="rankingNumber">{{ index + 1 }}</div>
          <span class="text" @click="handleClick(item.id,item.matchState)">{{ item.matchName }}</span>
          <div class="heat">{{ item.scale }}</div>
        </div>
      </HotRaceSkeleton>
    </el-card>
    <el-card class="side-card" shadow="never">
      <template #header>
        <h3>优秀学生 <span style="color: #F56C6C">榜单</span></h3>
      </template>
      <OutstandingSkeleton :loading="false">
        <vue3ScrollSeamless
            class="scroll-wrap"
            :classOptions="classOptions"
            :dataList="outstandingStudentList"
        >
          <div v-for="item in outstandingStudentList" :key="item.id" class="outstanding-student">
            <div class="outstanding-student-info">

              <div>
                <div class="outstanding-student-name"></div>
                <div class="outstanding-student-desc">
                  <div>
                    {{ item.nickName }} {{ item.major }}
                  </div>
                  <div>
                    综合评分:<span class="red">{{ item.score.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vue3ScrollSeamless>
      </OutstandingSkeleton>

    </el-card>
    <el-card class="side-card" shadow="never">
      <template #header>
        <div style="display: flex;justify-content: space-between">
          <h3>竞赛交流群 <span style="color: #F56C6C">Hot</span></h3>
          <el-radio-group v-model="chatGroup" size="small" @change="switchChatGroup">
            <el-radio-button label="QQ群" value="QQ群"/>
            <el-radio-button label="微信群" value="微信群"/>
          </el-radio-group>
        </div>
      </template>
      <GroupSkeleton :loading="chatGroupLoading ">
        <ul>
          <li class="hotChatGroup" v-for="item in chatGroupList">
            <span class="text">{{ item.title }}</span>
            <el-popover placement="left" :width="300" trigger="hover" :hide-after="0">
              <template #reference>
                <el-button class="join-btn" size="small" type="primary" plain>加入</el-button>
              </template>
              <template #default>
                <div class="popover-box">
                  <div class="QR-code">
                    <img :src="item.imageUrl" alt="QR code">
                  </div>
                  <div class="desc">
                    <div class="desc-title">
                      {{ "扫码加入交流" + chatGroup }}
                    </div>
                    <div class="desc-content">
                      {{ item.note }}
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
import {ref, onMounted, computed, reactive} from "vue";
import {getChatGroup, getHotCompetition, getExcellentStudent} from "@/api/competition.js";
import {useRouter} from "vue-router";

const chatGroup = ref("QQ群")
const chatGroupLoading = ref(true)
const chatGroupList = ref([])
const HotCompetitionLoading = ref(true)
const HotCompetitionList = ref([])
const outstandingStudentLoading = ref(true)
const outstandingStudentList = ref([])
const classOptions = {
      step: 0.3, // 数值越大速度滚动越快
      limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
      hoverStop: true, // 是否开启鼠标悬停stop
      direction: 1, // 0向下 1向上 2向左 3向右
      openWatch: true, // 开启数据实时监控刷新dom
      singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
      singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
    }
;

const router = useRouter()
const handleClick = (id, state) => {
  router.push(`/competition/competitions/details/${id}&${state}`)
}
const switchChatGroup = () => {
  let groupType;
  if (chatGroup.value === "QQ群") groupType = 1
  else groupType = 2
  getChatGroup(groupType).then(res => {
    chatGroupList.value = res.data.map(item => {
      return {
        ...item,
        imageUrl: import.meta.env.VITE_BASE_URL + item.imageUrl
      }
    })
    chatGroupLoading.value = false
  })

}
onMounted(() => {
  switchChatGroup()
  getHotCompetition().then(res => {
    HotCompetitionList.value = res.data
    HotCompetitionLoading.value = false
  })
  getExcellentStudent().then(res => {
    if (res.code === 200)
      outstandingStudentList.value = res.data
  })
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

.hotCompetition .text:hover {
  color: #409EFF;
  text-decoration: #409EFF underline;
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

.outstanding-student {
  padding: 0 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

.outstanding-student-info {
}

.outstanding-student-img-box {
  width: 45px;
  height: 45px;
  margin-right: 10px;

  .outstanding-student-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}

.outstanding-student-name {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin-bottom: 5px;
}

.outstanding-student-desc {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  color: #606266;
}

.scroll-wrap {
  height: 305px;
  margin: 0 auto;
  overflow: hidden;
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

.red {
  color: var(--el-color-error);
}
</style>
<template>
  <div class="competition-card">
    <div class="competition-info">
      <div class="competition-img">
        <img :src="data.headImage ? data.headImage : '/src/assets/notFound.jpg'" alt="">
      </div>
      <div class="competition-title-box">
        <div class="competition-title">
          <span class="title">{{ data?.matchName }}</span>
          <el-tag type="" effect="dark" style="margin-right: 10px;">
            {{ data.scale }}
          </el-tag>
          <el-tag :type="state?.type">
            {{ state?.text }}
          </el-tag>
        </div>
        <div class="step-box">
          <el-steps simple :active="data.presentStep">
            <el-step v-for="(item, index) in data.maxStep" :title="data?.maxStep > 1?'阶段' + item:'单流程比赛'"
                     @click.stop="handleStep(index + 1)"
                     class="step-item"/>
          </el-steps>
        </div>
        <div>
          <div class="date-box">
            <el-icon>
              <Clock/>
            </el-icon>
            <span>{{ formattedStartDate }}-{{ formattedFinishDate }}</span>
          </div>
          <div class="desc-box">
            <el-icon>
              <User/>
            </el-icon>
            <span>{{ data.signNum + ' / ' + data.maxCount }}</span>
          </div>
        </div>
      </div>
      <div class="competition-icon">
        <el-icon color="#909399">
          <ArrowRightBold/>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ArrowRightBold, Clock, User} from '@element-plus/icons-vue'
import {computed, h} from 'vue'
import {ElNotification, ElMessage} from 'element-plus'
import {positionStep} from '@/api/competitions.js';
import {useRouter} from 'vue-router'

const router = useRouter()
const props = defineProps({
  data: {
    type: Object
  }
})
const formattedStartDate = computed(() => {
  return props.data.startTime.split('-').join('.')
})
const formattedFinishDate = computed(() => {
  return props.data.deadline.split('-').join('.')
})
const state = computed(() => {
  if (props.data.matchState === -1)
    return {type: 'warning', text: '未开始'}
  else if (props.data.matchState === 0)
    return {type: '', text: '正在进行'}
  else if (props.data.matchState === 1)
    return {type: 'danger', text: '已结束'}
})
const handleStep = (stepNum) => {
  if (stepNum === 1) {
    router.push(`/competition/competitions/details/${props.data.id}&${props.data.state}`)
  } else if (props.data.presentStep < stepNum)
    ElNotification({
      title: '提示',
      type: 'warning',
      message: h('div', {style: 'color: teal'}, '流程尚未开始'),
      zIndex: 9999
    })
  else
    positionStep({
      matchId: props.data.id,
      stepNum: stepNum
    })
        .then(res => {
          router.push(`/competition/competitions/details/${res.data.id}&${res.data.data.matchState}`)
        })
        .catch(err => {
          console.log(err)
          ElMessage.error(err)
        })
}
</script>
<style lang="scss" scoped>
.competition-icon {
  transition: .4s;
}

.competition-card:hover .competition-icon {
  transform: translate(10px);
  transition: .4s;
}

.competition-info {
  display: flex;
  flex-direction: row;
}


.competition-img {
  width: 256px;
  height: 144px;
  padding-right: 30px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
}

.competition-title-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  width: 416px
}

.competition-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #303133;

  .title {
    padding-right: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

}

.desc-box, .date-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;

  span {
    padding-left: 5px;
  }
}

.competition-icon {
  display: flex;
  align-items: center;
}

.step-box {
  border-radius: 15px;
  padding: 5px 0;
  cursor: default;
}

.step-item {
  cursor: pointer;
}
</style>

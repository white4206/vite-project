<template>
  <el-main>
    <div class="backgroundBox">
      <canvas class="background">
      </canvas>
      <div class="analyze-box">
        <el-row justify="center" class="main-col">
          <el-col :span="7">
            <el-row>
              <el-col class="content">
                <el-card shadow="never" style="background: url('/src/assets/background.png');background-size: cover">
                  <template #header>我的获奖率</template>
                  <AwardRateChart ref="awardRateChartRef" :competitionData="analyzeData.competitionData"/>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="content">
                <el-card shadow="never">
                  <template #header>我的参赛类型</template>
                  <CompetitionTypeChart ref="competitionTypeChart" :typeData="analyzeData.typeData"/>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-carousel ref="mainChartRef" :autoplay="false" trigger="click" arrow="never" indicator-position="none"
                         style="height: 80%">
              <el-carousel-item>
                <SelfDescription/>
              </el-carousel-item>
              <el-carousel-item>
                <Recommended/>
              </el-carousel-item>
            </el-carousel>
            <div class="mainChartOptions" v-show="0">
              <el-radio-group v-model="mainChart" size="large" @change="handleChartChange">
                <el-radio-button label="用户画像" value="0"/>
                <el-radio-button label="智能推荐" value="1"/>
              </el-radio-group>
            </div>

            <div style="width:80%;margin: 0 auto;display: flex;align-items: center;justify-content: space-between">
              <div class="previousOption" @click="handlePreviousOption">
                <el-icon :size="32" color="#909399">
                  <ArrowLeftBold/>
                </el-icon>
              </div>
              <div style="display: flex;">
                <div class="selectOption" @click="handleSelect($event)" data-index="0">
                  <div class="selectOptionIcon">
                    <el-icon :size="48">
                      <svg t="1713100618629" class="icon" viewBox="0 0 1024 1024" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" p-id="22966" width="200" height="200">
                        <path
                            d="M564.906667 281.6m-192.853334 0a192.853333 192.853333 0 1 0 385.706667 0 192.853333 192.853333 0 1 0-385.706667 0Z"
                            :fill="currentIndex===0?'#409EFF':'#333333'" :opacity="currentIndex===0?'1':'.3'"
                            p-id="22967"></path>
                        <path
                            d="M512 467.626667c-119.466667 0-216.746667-97.28-216.746667-216.746667S392.533333 34.133333 512 34.133333s216.746667 97.28 216.746667 216.746667S631.466667 467.626667 512 467.626667zM512 85.333333c-92.16 0-165.546667 75.093333-165.546667 165.546667 0 92.16 75.093333 165.546667 165.546667 165.546667s165.546667-75.093333 165.546667-165.546667C677.546667 160.426667 604.16 85.333333 512 85.333333zM942.08 989.866667c-13.653333 0-25.6-11.946667-25.6-25.6 0-223.573333-180.906667-404.48-404.48-404.48S107.52 740.693333 107.52 964.266667c0 13.653333-11.946667 25.6-25.6 25.6s-25.6-11.946667-25.6-25.6c0-250.88 204.8-455.68 455.68-455.68s455.68 204.8 455.68 455.68c0 13.653333-10.24 25.6-25.6 25.6z"
                            fill="#333333" p-id="22968"></path>
                      </svg>
                    </el-icon>
                  </div>
                  <div :style="{'text-align': 'center','color':currentIndex===0?'#409EFF':''}">用户画像</div>
                </div>
                <div class="selectOption" @click="handleSelect($event)" data-index="1">
                  <div class="selectOptionIcon">
                    <el-icon :size="48" color="#409EFF">
                      <svg t="1713100675890" class="icon" viewBox="0 0 1024 1024" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" p-id="23133" width="200" height="200">
                        <path
                            d="M481.28 406.186667m-283.306667 0a283.306667 283.306667 0 1 0 566.613334 0 283.306667 283.306667 0 1 0-566.613334 0Z"
                            :fill="currentIndex===1?'#409EFF':'#333333'" :opacity="currentIndex===1?'1':'.3'"
                            p-id="23134"></path>
                        <path
                            d="M619.52 887.466667H401.066667c-51.2 0-92.16-40.96-92.16-92.16v-20.48C191.146667 706.56 119.466667 581.973333 116.053333 438.613333 112.64 242.346667 254.293333 69.973333 445.44 39.253333c116.053333-18.773333 233.813333 13.653333 322.56 88.746667 88.746667 75.093333 139.946667 186.026667 139.946667 302.08 0 148.48-73.386667 276.48-194.56 344.746667v20.48c0 51.2-42.666667 92.16-93.866667 92.16zM510.293333 85.333333c-18.773333 0-37.546667 1.706667-56.32 5.12-167.253333 27.306667-290.133333 175.786667-286.72 346.453334 1.706667 129.706667 69.973333 242.346667 179.2 298.666666l13.653334 6.826667v51.2c0 22.186667 18.773333 40.96 40.96 40.96h218.453333c22.186667 0 40.96-18.773333 40.96-40.96v-51.2l13.653333-6.826667c112.64-58.026667 180.906667-174.08 180.906667-307.2 0-100.693333-44.373333-196.266667-121.173333-262.826666-61.44-51.2-141.653333-80.213333-223.573334-80.213334zM628.053333 989.866667H395.946667c-13.653333 0-25.6-11.946667-25.6-25.6s11.946667-25.6 25.6-25.6h232.106666c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-25.6 25.6z"
                            fill="#333333" p-id="23135"></path>
                        <path
                            d="M271.36 366.933333c-1.706667 0-5.12 0-6.826667-1.706666-13.653333-3.413333-20.48-18.773333-17.066666-32.426667 42.666667-138.24 153.6-153.6 157.013333-153.6 13.653333-1.706667 27.306667 8.533333 29.013333 22.186667 1.706667 13.653333-8.533333 27.306667-22.186666 29.013333-3.413333 0-81.92 13.653333-116.053334 119.466667-1.706667 10.24-11.946667 17.066667-23.893333 17.066666z"
                            fill="#333333" p-id="23136"></path>
                      </svg>
                    </el-icon>
                  </div>
                  <div :style="{'text-align': 'center','color':currentIndex===1?'#409EFF':''}">智能推荐</div>
                </div>
              </div>
              <div class="nextOption" @click="handleNextOption">
                <el-icon :size="32" color="#909399">
                  <ArrowRightBold/>
                </el-icon>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <el-row>
              <el-col class="content">
                <el-card shadow="never">
                  <template #header>我的排名</template>
                  <MyRank :rankData="analyzeData.rankData"/>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="content">
                <el-card shadow="never"
                         style="background: url('/src/assets/background_.png');background-size:cover;background-position-x: right;">
                  <template #header>我的过去十月参赛趋势</template>
                  <CompetitionCycle ref="competitionCycleChart" :monthData="analyzeData.monthData"/>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script setup>
import AwardRateChart from "@/views/analyze/components/AwardRateChart.vue";
import CompetitionTypeChart from "@/views/analyze/components/CompetitionTypeChart.vue";
import MyRank from "@/views/analyze/components/SelfRank.vue";
import CompetitionCycle from "@/views/analyze/components/CompetitionCycle.vue";
import {onMounted, ref} from "vue";
import {getAnalyzeData,getUserAnalyze} from "@/api/analyze.js";
import Recommended from "@/views/analyze/components/Recommended.vue";
import SelfDescription from "@/views/analyze/components/SelfDescription.vue";
import {ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue'
import Particles from 'particlesjs/dist/particles.min.js'

const currentIndex = ref(0)
const mainChart = ref(0)
const mainChartRef = ref()
const awardRateChartRef = ref()
const competitionTypeChart = ref()
const competitionCycleChart = ref()
const analyzeData = ref({
  rankData: {
    self: {},
    total: {}
  },
  competitionData: {
    award: {
      college: 0,
      province: 0,
      national: 0,
    },
    takePartIn: {
      college: 0,
      province: 0,
      national: 0,
    }
  },
  typeData: [],
  monthData: []
})

const getData = () => {
  getAnalyzeData().then(res => {
    if (res.code === 200) {
      // 我的排名数据处理
      analyzeData.value.rankData.self = res.data.rank
      analyzeData.value.rankData.total = res.data.personalNum

      // 我的获奖及参赛数据处理
      analyzeData.value.competitionData.award.college = res.data.awardsNumByCollege
      analyzeData.value.competitionData.award.province = res.data.awardsNumByProvince
      analyzeData.value.competitionData.award.national = res.data.awardsNumByNational
      analyzeData.value.competitionData.takePartIn.college = res.data.takepartInByCollege
      analyzeData.value.competitionData.takePartIn.province = res.data.takepartInByProvince
      analyzeData.value.competitionData.takePartIn.national = res.data.takepartInByNational

      // 我的参赛类型数据处理(此处不可使用map迭代,可能原因是因为复杂类型...)
      for (let item of res.data.takepartInByType)
        analyzeData.value.typeData.push({name: item.title, value: item.content})

      // 我的参赛周期
      for (let item of res.data.takepartInByMonth)
        analyzeData.value.monthData.push([item.title, item.content])
    }

    competitionTypeChart.value.chartInit()
    awardRateChartRef.value.chartInit()
    competitionCycleChart.value.chartInit()

    // getUserAnalyze(res.data.userId).then(res=>{
    //   console.log(res)
    // })
  });
}

const handleChartChange = () => {
  mainChartRef.value.setActiveItem(mainChart.value)
}

const handleSelect = (e) => {
  mainChartRef.value.setActiveItem(e.currentTarget.dataset.index)
  currentIndex.value = Number(e.currentTarget.dataset.index)
}
const handlePreviousOption = () => {
  currentIndex.value--;
  if (currentIndex.value < 0)
    currentIndex.value = 1
  mainChartRef.value.setActiveItem(currentIndex.value)
  currentIndex.value = Number(currentIndex.value)
}
const handleNextOption = () => {
  currentIndex.value++;
  if (currentIndex.value > 1)
    currentIndex.value = 0
  mainChartRef.value.setActiveItem(currentIndex.value)
  currentIndex.value = Number(currentIndex.value)
}
onMounted(() => {
  getData()

  Particles.init
  ({
    selector: '.background',
    speed: 0.2,
    maxParticles: 120, // 最大粒子数
    sizeVariations: 3, // 粒子最大尺寸
    minDistance: 120, // 连线距离
    connectParticles: true, // 是否连线
    color: '#337ecc',
  });
})
</script>

<style scoped lang="scss">
.el-main {
  max-width: none;
}

.backgroundBox {
  position: relative;
  border-radius: 15px;
}

.background {
  position: absolute;
  border-radius: 15px;
  background-color: #FFFFFF;
  z-index: 0;
}

.analyze-box {
  border-radius: 15px;
  padding: 20px;
  background-color: #FFFFFF;
  border: 1px solid #e4e7ed;
}

.content {
  margin-bottom: 20px;
}

.el-card {
  border: none;
}

:deep(.el-carousel__container) {
  height: 90%;
}

.mainChartOptions {
  display: flex;
  justify-content: center;
}

.selectOption {
  cursor: pointer;
  transition: .2s;
  margin: 0 10px;
}

.selectOptionIcon {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selectOption:hover {
  scale: 1.1;
  transition: .2s;
}

.previousOption {
  transition: .2s;
  cursor: pointer;
}

.previousOption:hover {
  transition: .2s;
  scale: 1.1;
}

.nextOption {
  transition: .2s;
  cursor: pointer;
}

.nextOption:hover {
  transition: .2s;
  scale: 1.1;
}
</style>
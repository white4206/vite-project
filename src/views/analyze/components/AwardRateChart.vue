<template>
  <div id="awardRate"/>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";

const props = defineProps({
  competitionData: {
    type: Object
  }
})

let chartDom;
let myChart;
let option;
const chartInit = () => {
  if (myChart !== undefined)
    myChart.dispose()

  chartDom = document.getElementById('awardRate');
  myChart = echarts.init(chartDom);

  option = {
    tooltip: {},
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#303133'
          }
        },
        axisLine: {
          lineStyle: {
            width: 40
          }
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
        },
        data: [
          {
            // value: (props.competitionData.award.college / props.competitionData.takePartIn.college) * 100
            //     ? ((props.competitionData.award.college / props.competitionData.takePartIn.college) * 100).toFixed(2) : 0,
            value: "72",
            name: '校级',
            title: {
              offsetCenter: ['0%', '-50%']
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '-35%']
            }
          },
          {
            // value: (props.competitionData.award.province / props.competitionData.takePartIn.province) * 100
            //     ? ((props.competitionData.award.province / props.competitionData.takePartIn.province) * 100).toFixed(2) : 0,
            value: "84",
            name: '省级',
            title: {
              offsetCenter: ['0%', '-10%']
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '5%']
            }
          },
          {
            // value: (props.competitionData.award.national / props.competitionData.takePartIn.national) * 100
            //     ? ((props.competitionData.award.national / props.competitionData.takePartIn.national) * 100).toFixed(2) : 0,
            value: "68",
            name: '国家级',
            title: {
              offsetCenter: ['0%', '30%']
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '45%']
            }
          }
        ],
        title: {
          fontSize: 14
        },
        detail: {
          width: 40,
          height: 12,
          fontSize: 12,
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%'
        }
      }
    ]
  };

  option && myChart.setOption(option);

  // 监听窗口变化重新渲染图
  window.addEventListener('resize', function () {
    myChart.resize();
  });
}

onMounted(() => {
  chartInit()
})

defineExpose({
  chartInit
})
</script>

<style lang="scss" scoped>
#awardRate {
  width: 100%;
  height: 350px;
}
</style>
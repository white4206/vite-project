<template>
  <div id="competitionCycle"/>
</template>

<script setup>
import {onMounted} from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  monthData: {
    type: Array
  }
})

let chartDom;
let myChart;
let option;

const chartInit = () => {
  if (myChart !== undefined) {
    myChart.dispose()
  }

  chartDom = document.getElementById('competitionCycle');
  myChart = echarts.init(chartDom);

  option = {
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    tooltip:{},
    series: [
      {
        data: props.monthData,
        type: 'line',
        smooth: true
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
#competitionCycle {
  width: 100%;
  height: 450px;
}
</style>
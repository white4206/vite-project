<template>
  <div id="competitionType"/>
</template>

<script setup>
import {onMounted} from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  typeData: {
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

  chartDom = document.getElementById('competitionType');
  myChart = echarts.init(chartDom);

  option = {
    legend: {
      top: 'bottom'
    },
    tooltip: {},
    series: [
      {
        name: '',
        type: 'pie',
        radius: [50, 150],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.typeData
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
#competitionType {
  width: 100%;
  height: 450px;
}
</style>
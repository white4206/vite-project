<template>
  <div style="height:100%;display: flex;flex-direction: column;justify-content: space-between">
    <!--    系统建议-->
    <div style="max-height: 200px">
      <el-row style="margin: 0 auto;" class="recommended">
        <el-col>
          <div>
            <div style="margin-bottom: 10px;text-align: center">
              <el-text tag="b" size="large"><h2>系统建议</h2></el-text>
            </div>
            <div style="font-size: 18px;line-height: 2">
              您的参赛效率值为中等水平，还有一定的进步空间，建议优化学习策略，探索更高效的学习方案，以帮助您在竞赛中取得更好的成绩，您在算法类竞赛取得了不错的成绩，建议继续保持深入学习算法类相关知识，积极参加各类培训课程。您的近期活跃度较高，这是一个积极的信号，请继续保持。
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--    竞赛推荐-->
    <div>
      <div style="max-height: 250px">
        <div class="recommended" style="text-align: center;margin: 0 auto;">
          <el-text tag="b" size="large"><h2>竞赛推荐</h2></el-text>
        </div>
        <el-carousel style="max-width: 600px;margin: 0 auto" :interval="2000" type="card" @change="handleChange"
                     height="200px">
          <el-carousel-item v-for="item in dataList" :key="item.id">
            <div>
              <el-image :src="item.imageUrl"/>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <template v-for="(item,index) in dataList" :key="item.id">
        <el-row v-if="index===currentIndex" style="z-index: 999;margin: 0 auto;" class="recommended">
          <el-col>
            <div>
              <el-text tag="b" size="large" line-clamp="2">{{ item.title }}</el-text>
              <div style="display:flex;justify-content:space-between;align-items:center;margin: 10px 0">
                <div>
                  <el-tag style="margin-right: 5px">{{ item.tag }}</el-tag>
                  <el-tag style="margin-right: 5px">{{ "算法" }}</el-tag>
                </div>
                <el-button type="primary" @click="handleAttend(item.id,item.state)">前往参赛</el-button>
              </div>
              <el-text> 预测获奖概率: <span class="green">{{ item.predict }}</span></el-text>
            </div>
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()
const currentIndex = ref(0)
const dataList = ref([
  {
    id: 187,
    imageUrl: import.meta.env.VITE_BASE_URL + "/springboot/file/head-img/4.jpg",
    title: "【榜单赛事】第六届全球校园人工智能算法精英大赛",
    tag: "省级",
    state: "1",
    predict: "93%"
  }, {
    id: 160,
    imageUrl: import.meta.env.VITE_BASE_URL + "/springboot/file/head-img/1.jpg",
    title: "2024大学生信息系统创新大赛——“开发者”算法编程挑战赛",
    tag: "省级",
    state: "1",
    predict: "79%"
  }, {
    id: 189,
    imageUrl: import.meta.env.VITE_BASE_URL + "/profile/upload/2024/03/27/第十五届蓝桥杯大赛项目实战赛（AI办公_20240327120119A004.jpg",
    title: "2024第三届大学生算法大赛",
    tag: "国家级",
    state: "1",
    predict: "67%"
  }
])

const handleChange = (e) => {
  currentIndex.value = e
}
const handleAttend = (id, state) => {
  router.push(`/competition/competitions/details/${id}&${state}`);
}
</script>

<style scoped lang="scss">
.green {
  color: var(--el-color-success);
  font-weight: bold;
}

.recommended {
  padding: 20px 20px;
  background-color: #F5F7FA;
  border-radius: 5px;
  max-width: 600px;
}
</style>
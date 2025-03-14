<template>
  <el-main>
    <el-row justify="space-around" style="margin-bottom: 20px">
      <el-col :span="22">
        <div class="grid-content">
          <Swiper></Swiper>
        </div>
      </el-col>
    </el-row>
  </el-main>
  <div class="competition-box">
    <el-row justify="space-around" class="competitions">
      <el-col :span="18">
        <el-card v-if="store.GET_ROLE() === '1'" shadow="never" class="competition-box-card">
          <template #header>
            <div style="display: flex;align-items: center;">
              <span style="font-weight: bold;font-size: 18px;color:#337ecc ;">竞赛列表</span>
              <el-icon color="#c8c9cc">
                <BottomRight/>
              </el-icon>
            </div>
          </template>
          <CompetitionList/>
        </el-card>
        <el-tabs v-else v-model="activeName" class="demo-tabs">
          <el-tab-pane label="竞赛列表" name="competition">
            <CompetitionList/>
          </el-tab-pane>
          <el-tab-pane label="报名审核" name="checkDetails">
            <CheckList/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import CheckList from '@/views/competition/competition/components/CheckList.vue'
import CompetitionList from '@/views/competition/competition/components/CompetitionList.vue'
import useLoginStore from '@/store/loginStore';
import Swiper from "@/views/competition/components/Swiper.vue";
import {ref} from 'vue'
import {BottomRight} from "@element-plus/icons-vue";

const store = useLoginStore()
const activeName = ref("competition")
</script>

<style lang="scss" scoped>
::v-deep .el-main {
  padding: 0px 20px;
}

.competition-box {
  background-color: #FFFFFF;
}

.competition-box-card {
  border: none;
}

.competitions {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}

.competition-box-card:deep(.el-card__header) {
  padding: 10px;
}

.competition-box-card:deep(.el-card__body) {
  padding: 0;
  padding-top: 10px;
}

</style>

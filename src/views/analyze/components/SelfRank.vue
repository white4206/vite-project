<template>
  <el-row :gutter="20">
    <el-col :span="9">
      <div style="border-right: 2px solid #e4e7ed;">
        <div class="statistic-card">
          <el-statistic :value="rankData.self.totalRank" :suffix="'/'+rankData.total.total">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                全校排名
                <el-tooltip
                    effect="dark"
                    :content="'全校总人数:'+rankData.total.total"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <!--        <div class="statistic-footer">-->
          <!--          <div class="footer-item">-->
          <!--            <span>...</span>-->
          <!--            <span class="green">-->
          <!--              24%-->
          <!--              <el-icon>-->
          <!--                <CaretTop/>-->
          <!--              </el-icon>-->
          <!--            </span>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
        <div class="statistic-card">
          <el-statistic :value="rankData.self.collegeRank" :suffix="'/'+rankData.total.college">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                学院排名
                <el-tooltip
                    effect="dark"
                    :content="'学院总人数:'+rankData.total.college"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <!--        <div class="statistic-footer">-->
          <!--          <div class="footer-item">-->
          <!--            <span>...</span>-->
          <!--            <span class="red">-->
          <!--              12%-->
          <!--              <el-icon>-->
          <!--                <CaretBottom/>-->
          <!--              </el-icon>-->
          <!--            </span>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
        <div class="statistic-card">
          <el-statistic :value="rankData.self.majorRank" :suffix="'/'+rankData.total.major">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                专业排名
                <el-tooltip
                    effect="dark"
                    :content="'学院总人数:'+rankData.total.major"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <!--        <div class="statistic-footer">-->
          <!--          <div class="footer-item">-->
          <!--            <span>...</span>-->
          <!--            <span class="green">-->
          <!--              16%-->
          <!--              <el-icon>-->
          <!--                <CaretTop/>-->
          <!--              </el-icon>-->
          <!--            </span>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
        <div>

        </div>
      </div>
    </el-col>
    <el-col :span="15">
      <div class="selfInfo-box">
        <div class="selfInfo">姓名: <span>小杨同学</span></div>
        <div class="selfInfo">学院: <span>计算机科学与工程学院</span></div>
        <div class="selfInfo">专业: <span>计算机科学与技术专业</span></div>
        <div class="selfInfo">入学年份: <span>2021</span></div>
        <div class="selfInfo">班级: <span>4</span></div>
        <div class="selfInfo">综合评分:<span :class="rankData.self.totalScore>9?'red':'green'"> {{
            " " + rankData.self.totalScore
          }}分</span></div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col>

    </el-col>
  </el-row>
</template>

<script setup>
import {Warning,} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'

const props = defineProps({
  rankData: {
    type: Object,
  }
})

onMounted(() => {
})
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  padding: 20px 10px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.selfInfo-box {
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.selfInfo {
  font-size: 14px;
  margin-bottom: 10px;

  span {
    margin-left: 10px;
    font-size: 14px;
  }
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}
</style>

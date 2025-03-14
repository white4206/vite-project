<template>
  <el-main>
    <el-row justify="center">
      <el-col :span="18">
        <el-card class="apply-box" shadow="never">
          <!--          <template #header>-->
          <!--            校外比赛奖项认证申请-->
          <!--          </template>-->
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="校外比赛奖项认证申请" name="apply">
              <ApplyForm @apply="handleApply"/>
            </el-tab-pane>
            <el-tab-pane label="申请记录" name="record">
              <ApplyRecord ref="applyRecord"/>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup>
import ApplyRecord from "@/views/apply/components/ApplyRecord.vue";
import ApplyForm from "@/views/apply/components/ApplyForm.vue";
import {ref} from 'vue'

const activeName = ref("apply")
const applyRecord = ref()

const handleApply = () => {
  applyRecord.value.getData()
}
</script>
<style lang="scss" scoped>
@keyframes applyBoxMove {
  from {
    transform: translate(0, -500px)
  }

  to {
  }
}

.apply-box {
  animation: 1s applyBoxMove;
  transition: .8s;
  border-radius: 15px;
  padding: 20px;
  background-color: #FFFFFF;
}

</style>

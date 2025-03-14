<template>
  <el-row class="box">
    <el-col :span="9">
      <div class="grid-content">
        <el-form label-width="75px" class="demo-ruleForm" status-icon size="large" label-position="left">
          <el-form-item label="用户头像" prop="name">
            <UploadAvatar></UploadAvatar>
          </el-form-item>
          <el-form-item label="获奖信息" prop="prizeInfo">
            <el-tag size="large" round hit @click="viewAwardRecord" class="tag-button">
              <div style="display: flex;align-items: center;">
                查看获奖记录
                <el-icon>
                  <ArrowRightBold/>
                </el-icon>
              </div>
            </el-tag>
          </el-form-item>
        </el-form>
        <AwardRecord v-model="isViewAward"></AwardRecord>
      </div>
    </el-col>
    <el-col :span="15">
      <div class="grid-content information-box">
        <SelfInformation></SelfInformation>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import {ArrowRightBold} from '@element-plus/icons-vue'
import SelfInformation from './components/SelfInformation.vue';
import UploadAvatar from './components/UploadAvatar.vue';
import AwardRecord from './components/AwardRecord.vue';
import {ref} from 'vue'

const isViewAward = ref(false)
const viewAwardRecord = () => {
  isViewAward.value = true
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
}

.information-box {
  border-left: 2px dotted #C0C4CC;
  padding: 0 150px 0 75px;
}

.box {
  min-height: 100%;
  padding: 20px;
  border-radius: 15px;
  background-color: #FFFFFF;
}

.tag-button {
  transition: .4s;
}

.tag-button:hover {
  cursor: pointer;
  transform: translate(10px);
  background-color: #ffffff;
  transition: .4s;
}
</style>
  

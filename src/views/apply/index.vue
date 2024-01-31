<template>
  <el-main>
    <el-row justify="center">
      <el-col :span="18">
        <el-card class="changePassword-box">
          <template #header>
            校外比赛奖项认证申请
          </template>
          <el-form class="applyForm" :model="applyForm" ref="applyFormRef" :rules="applyRules"
                   label-width="120px">
            <el-form-item label="参赛团队" prop="selectTeam">
              <el-select v-model="applyForm.selectTeam" clearable>
                <el-option v-for="(item,index) in teamList" :label="item.label" :value="item.value" :key="index"/>
              </el-select>
            </el-form-item>
            <el-form-item label="比赛名称" prop="competitionName">
              <el-input v-model="applyForm.competitionName" clearable/>
            </el-form-item>
            <el-form-item label="比赛类型" prop="competitionType">
              <el-input v-model="applyForm.competitionType" clearable/>
            </el-form-item>
            <el-form-item label="比赛规模" prop="competitionScale">
              <el-select v-model="applyForm.competitionScale" clearable>
                <el-option v-for="(item,index) in scaleList" :label="item.label" :value="item.value" :key="index"/>
              </el-select>
            </el-form-item>
            <el-form-item label="获奖级别" prop="awardLevel">
              <el-input v-model="applyForm.awardLevel" clearable/>
            </el-form-item>
            <el-form-item label="最高奖项级别" prop="highestLevel">
              <el-input v-model="applyForm.highestLevel" clearable/>
            </el-form-item>
            <el-form-item label="证明文件" prop="uploadFile">
              <el-upload drag show-file-list :auto-upload="false" :limit="1">
                <el-icon class="el-icon--upload">
                  <uploadFilled/>
                </el-icon>
                <div class="el-upload__text">
                  拖拽文件到这里或<em>点击上传</em>
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div class="operation-btn">
            <el-button>重新填写</el-button>
            <el-button type="primary">提交申请</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {UploadFilled} from "@element-plus/icons-vue";
import {changePw} from '@/api/setting.js'
import {ElMessage, ElLoading} from 'element-plus'
import {joinedTeams} from "@/api/team.js";

const applyFormRef = ref()
const applyForm = ref({
  selectTeam: null,
  competitionName: null,
  competitionType: null,
  competitionScale: null,
  awardLevel: null,
  highestLevel: null,
})
const applyRules = ref({
  selectTeam: [{required: true, trigger: "blur", message: "请选择参赛团队"}],
  competitionName: [{required: true, trigger: "blur", message: "请输入比赛名称"}],
  competitionType: [{required: true, trigger: "blur", message: "请输入比赛类型"}],
  competitionScale: [{required: true, trigger: "blur", message: "请选择比赛规模"}],
  awardLevel: [{required: true, trigger: "blur", message: "请输入获奖等级"}],
  highestLevel: [{required: true, trigger: "blur", message: "请输入最高奖项级别"}],
  uploadFile: [{required: true, trigger: "blur", message: "请上传证明文件"}]
})
const teamList = ref()
const scaleList = ref([
  {
    value: "1",
    label: "校级",
  }, {
    value: "2",
    label: "市级",
  }, {
    value: "3",
    label: "省级",
  }, {
    value: "4",
    label: "国家级",
  }
])
onMounted(() => {
  joinedTeams().then(res => {
    teamList.value = res.data.map(item => {
      return {
        value: item.id,
        label: item.groupName,
      }
    })
  })
})
</script>

<style>
@keyframes changePasswordBoxMove {
  from {
    transform: translate(0, -500px)
  }

  to {
  }
}
</style>

<style lang="scss" scoped>
.changePassword-box {
  animation: 1s changePasswordBoxMove;
  transition: .8s;
  border-radius: 15px;
  padding: 20px;
  background-color: #FFFFFF;
}

.applyForm {
  width: 60%;
}

.operation-btn {
  text-align: right;
}
</style>

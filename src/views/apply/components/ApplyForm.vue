<template>
  <el-form class="applyForm" :model="applyForm" ref="applyFormRef" :rules="applyRules"
           label-width="120px">
    <el-form-item label="比赛名称" prop="competitionName">
      <el-input v-model="applyForm.competitionName" placeholder="请输入比赛名称" clearable/>
    </el-form-item>
    <el-form-item label="比赛规模" prop="competitionScale">
      <el-select v-model="applyForm.competitionScale" placeholder="请选择比赛规模" clearable>
        <el-option v-for="(item,index) in scaleList" :label="item.label" :value="item.value" :key="index"/>
      </el-select>
    </el-form-item>
    <el-form-item label="参赛团队" prop="selectTeam">
      <el-select v-model="applyForm.selectTeam" clearable placeholder="请选择参赛团队">
        <el-option v-for="(item,index) in teamList" :label="item.label" :value="item.value" :key="index"/>
      </el-select>
    </el-form-item>
    <el-form-item label="参赛时间" prop="attendTime">
      <el-date-picker
          v-model="applyForm.attendTime"
          type="date"
          placeholder="请选择参赛时间"
      />
    </el-form-item>
    <el-form-item label="获奖级别" prop="awardLevel">
      <el-input v-model="applyForm.awardLevel" placeholder="请输入获奖级别" clearable/>
    </el-form-item>
    <el-form-item label="获奖名称" prop="awardName">
      <el-input v-model="applyForm.awardName" placeholder="请输入获奖级别" clearable/>
    </el-form-item>
    <el-form-item label="最高奖项级别" prop="maxLevel">
      <el-input v-model="applyForm.maxLevel" placeholder="请输入最高奖项级别" clearable/>
    </el-form-item>
    <el-form-item label="获奖时间" prop="awardTime">
      <el-date-picker
          v-model="applyForm.awardTime"
          type="date"
          placeholder="请选择获奖时间"
      />
    </el-form-item>
    <el-form-item label="证明文件" prop="uploadFile">
      <el-upload drag ref="uploadRef" show-file-list :auto-upload="false" :on-change="handleUpload"
                 :limit="2">
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
    <el-button @click="reset">重新填写</el-button>
    <el-button type="primary" @click="submit">提交申请</el-button>
  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import {UploadFilled} from "@element-plus/icons-vue";
import {createdTeams} from "@/api/team.js";
import {applyAward} from "@/api/apply.js";
import {ElMessage} from "element-plus";

const emit = defineEmits(['apply'])
const uploadRef = ref()
const applyFormRef = ref()
const applyForm = ref({
  selectTeam: null,
  attendTime: null,
  competitionName: null,
  competitionScale: null,
  awardTime: null,
  awardLevel: null,
  awardName: null,
  maxLevel: null,
  uploadFile: null,

})
const applyRules = ref({
  selectTeam: [{required: true, trigger: "blur", message: "请选择参赛团队"}],
  attendTime: [{required: true, trigger: "blur", message: "请选择参赛时间"}],
  competitionName: [{required: true, trigger: "blur", message: "请输入比赛名称"}],
  competitionScale: [{required: true, trigger: "blur", message: "请选择比赛规模"}],
  awardTime: [{required: true, trigger: "blur", message: "请选择获奖时间"}],
  awardLevel: [{required: true, trigger: "blur", message: "请输入获奖等级"}],
  awardName: [{required: true, trigger: "blur", message: "请输入获奖名称"}],
  maxLevel: [{required: true, trigger: "blur", message: "请输入最高奖项级别"}],
  uploadFile: [{required: true, trigger: "blur", message: "请上传证明文件"}]
})
const teamList = ref()
const scaleList = ref([
  {label: "校级", value: "校级"},
  {label: "省级", value: "省级"},
  {label: "国家级", value: "国家级"},
])

const reset = () => {
  applyFormRef.value.resetFields()
}
const handleUpload = (rawFile, rawFileList) => {
  console.log(rawFile)
  if (rawFileList.length > 1) {
    rawFileList.splice(0, 1);
  }
  if (rawFile.raw.type !== 'application/x-zip-compressed') {
    ElMessage.error('证明文件只能是zip格式')
    uploadRef.value.clearFiles()
  } else if (rawFile.raw.size / 1024 / 1024 > 50) {
    ElMessage.error('压缩包大小不能超过50MB!')
    uploadRef.value.clearFiles()
  } else {
    applyForm.value.uploadFile = rawFile.raw
  }
}
const submit = () => {
  applyFormRef.value.validate(valid => {
    if (valid) {
      let formData = new FormData()
      formData.append("matchName", applyForm.value.competitionName)
      formData.append("scale", applyForm.value.competitionScale)
      formData.append("groupId", applyForm.value.selectTeam)
      formData.append("takepartTime", applyForm.value.attendTime)
      formData.append("awardsLevel", applyForm.value.awardLevel)
      formData.append("awardsName", applyForm.value.awardName)
      formData.append("maxLevel", applyForm.value.maxLevel)
      formData.append("groupId", applyForm.value.selectTeam)
      formData.append("awardsTime", applyForm.value.awardTime)
      formData.append("proveFile", applyForm.value.uploadFile)
      applyAward(formData).then(res => {
        if (res.code === 200) {
          ElMessage.success(res.data)
          applyFormRef.value.resetFields()
          emit("apply")
        } else
          ElMessage.error(res.msg)
      }).catch(err => console.log(err))
    }else
      ElMessage.error("请正确填写认证申请内容")
  })
}
onMounted(() => {
  createdTeams().then(res => {
    teamList.value = res.data.map(item => {
      return {
        value: item.id,
        label: item.groupName,
      }
    })
  })
})

</script>
<style scoped lang="scss">
.applyForm {
  width: 60%;
}

.operation-btn {
  text-align: right;
}
</style>
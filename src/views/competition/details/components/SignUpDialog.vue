<template>
  <el-dialog :close-on-click-modal="false" :destroy-on-close="true" :close-on-press-escape="false"
             style="border-radius: 15px;"
             @close="handleClose">
    <div class="dialog-box">
      <el-form ref="formRef" :model="form" :rules="rules" status-icon size="large" label-position="top"
               require-asterisk-position="right">
        <el-form-item label="选择您的参赛团队" prop="team" required>
          <template #label>
            <span class="title-text">选择您的参赛团队</span>
          </template>
          <el-select v-model="form.team" value-key="id" placeholder="请选择团队" size="large" :filterable="true"
                     no-match-text="未找到您的团队" no-data-text="您还没有自己的团队" :clearable="true">
            <el-option v-for="(item, index) in teamData" :key="item.id" :label="item.groupName" :value="item">
              <!--              <div class="option-item">-->
              <!--                <img :src="item?.logoUrl ? item?.logoUrl : 'src/assets/team.png'" :alt="item.groupName"-->
              <!--                     width="25">-->
              <!--                <span>{{ item.groupName }}</span>-->
              <!--              </div>-->
            </el-option>
            <template #prefix>
              <img v-if="form.team" :src="form.team?.logoUrl ? form.team?.logoUrl : 'src/assets/team.png'"
                   :alt="form.team?.groupname" width="25">
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="上传附件" prop="file" required>
          <template #label>
            <span class="title-text">上传附件</span>
          </template>
          <UploadFiles @uploadFile="handleUploadFile"></UploadFiles>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <template #label>
            <span class="title-text">备注</span>
          </template>
          <el-input v-model="form.desc" :rows="3" maxlength="100" show-word-limit type="textarea" resize="none"
                    disabled placeholder="暂不支持添加备注，功能待完善"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSignUp">报名</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script setup>
import UploadFiles from './UploadFiles.vue'
import {ElMessage} from 'element-plus'
import {ref, onMounted} from 'vue'
import {createdTeams} from '@/api/team.js'
import {teamSignUp} from '@/api/signUp.js'
import {useRoute} from 'vue-router'
import useLoginStore from '@/store/loginStore.js'
import {applyAward} from "@/api/apply.js";

const store = useLoginStore()
const route = useRoute()
const props = defineProps({
  id: {
    type: Number
  }
})
const teamData = ref()
const emit = defineEmits(['update:modelValue'])
onMounted(() => {
  if (store.GET_ROLE() === '1') {
    createdTeams()
        .then(res => {
          if (res.code === 200)
            teamData.value = res.data
        })
        .catch(err => {
          console.log(err)
          ElMessage.error(err)
        })
  }
})
const form = ref({
  team: '',
  file: '',
  desc: ''
})
const uploadFiles = ref()
const handleUploadFile = (msg) => {
  uploadFiles.value = msg
}
const rules = ref({
  team: [{required: true, message: "请选择参赛队伍", trigger: "blur"}],
  file: [{required: true, message: "请上传报名文件", trigger: "blur"}]
})
const formRef = ref()
const handleSignUp = () => {
  form.value.file = uploadFiles.value[0].raw
  formRef.value.validate(valid => {
    if (valid) {
      let formData = new FormData()
      formData.append("file", uploadFiles.value[0].raw)
      formData.append('groupid', form.value.team.id)
      formData.append('matchid', props.id)

      teamSignUp(route.params.Cid.split('&')[0], formData)
          .then(res => {
            emit('update:modelValue', false)
            formRef.value.resetFields()
            if (res.data === '报名成功，等待审核')
              ElMessage.success(res.data)
            else if (res.data === '无法重复报名')
              ElMessage.warning(res.data)
          })
          .catch(err => {
            console.log(err)
            ElMessage.error(err)
          })
    } else
      ElMessage.error("请正确填写报名信息")
  })
}
const handleClose = () => {
  emit('update:modelValue', false)
}
const handleCancel = () => {
  formRef.value.resetFields()
  emit('update:modelValue', false)
  ElMessage.info("取消修改")
}
</script>
<style lang="scss" scoped>
.option-item {
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    padding-left: 10px;
  }
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.dialog-box {
  padding: 0 50px;
}

.title-text {
  font-size: 16px;
  font-weight: bold;
  color: #606266;
}
</style>

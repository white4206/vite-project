<template>
  <el-dialog title="none" width="80%" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true"
             :close-on-press-escape="false" style="border-radius: 15px;">
    <template #header="{ close, titleId, titleClass }">
      <div>
        <h4 :id="titleId" :class="titleClass">编辑团队</h4>
      </div>
    </template>
    <div class="dialog-content">
      <el-row justify="center" class="content">
        <el-col :span="9">
          <div class="grid-content">
            <el-form ref="formRef" :model="form" label-width="120px" :rules="rules" status-icon size="large"
                     label-position="left">
              <el-form-item label="团队名称" prop="name">
                <el-input v-model="form.name" disabled placeholder="暂不支持修改，功能待完善"/>
              </el-form-item>
              <el-form-item label="团队logo" prop="logo">
                <UploadLogo :form="form" :logoFile="logoFile"></UploadLogo>
              </el-form-item>
              <el-form-item label="团队描述" prop="desc">
                <el-input v-model="form.desc" :rows="6" maxlength="100" show-word-limit type="textarea"
                          resize="none" disabled placeholder="暂不支持修改，功能待完善"/>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="15">
          <AddCollapse :teamData="teamData" :id="id" :teamName="teamName" :memberData="memberData"
                       :teacherData="teacherData"></AddCollapse>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitEdit">保存</el-button>
        <el-button @click="cancelEdit">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import UploadLogo from '../../../components/UploadLogo.vue'
import AddCollapse from './AddCollapse.vue'
import {ref, reactive, onMounted, provide, inject, computed} from 'vue'
import {ElMessage} from 'element-plus'
// import validator from '../../../validator/name/index'
import {teamMember, teamTeacher} from '@/api/team.js'

const props = defineProps({
  id: {
    type: Number
  }
})
const teamData = reactive({
  leader: {},
  member: [],
  teacher: {}
})
const logoFile = ref([])
const memberData = ref()
const teacherData = ref()
const teamName = ref()
const getTeamMember = () => {
  teamMember(props.id)
      .then(res => {
        if (res.code === 200)
          memberData.value = res.data
      })
      .catch(err => {
        console.log(err)
      })
}
const getTeamTeacher = () => {
  teamTeacher(props.id)
      .then(res => {
        if (res.code === 200)
          teacherData.value = res.data
      })
      .catch(err => {
        console.log(err)
      })
}
const getData = (msg = '') => {
  getTeamMember()
  getTeamTeacher()
  if (msg === "Delete") ElMessage.success("成员变更成功")
  else if (msg === "AddMember") ElMessage.success("发送邀请成员消息成功")
  else if (msg === "AddTeacher") ElMessage.success("发送邀请指导老师消息成功")
}
onMounted(() => {
  getData()
})
//表单校验
const logoValidator = (rule, value, callback) => {
  // if (value === '')
  //     callback(new Error("请上传团队logo"));
  // else
  callback()
}
const nameValidator = (rule, value, callback) => {
  callback()
}
// validator(rule, value, callback)
const rules = reactive({
  name: [{message: '请输入团队名称', trigger: 'blur'}, {validator: nameValidator, trigger: 'blur'}],
  logo: [{validator: logoValidator, trigger: 'blur'}],
  desc: [{required: false, message: '请输入团队描述', trigger: 'blur'}, {
    min: 10,
    max: 200,
    message: '内容至少为10位',
    trigger: 'blur'
  }]
})
//表单
const emit = defineEmits(['update:modelValue'])
const formRef = ref()
const form = reactive({
  name: '',
  logo: '',
  desc: '',
})
const getTeamCardData = inject("getData")
const submitEdit = () => {
  formRef.value.validate().then(res => {
    emit('update:modelValue', false)
    ElMessage.success('编辑成功')
    getData()
    getTeamCardData()
  }).catch(err => {
    ElMessage.error("请正确填写团队信息!")
  })
}
const cancelEdit = (btnRef, msg = '') => {
  emit('update:modelValue', false)
  getData()
  if (msg === 'changeCaptain') {
    ElMessage.warning("您已失去管理权限")
    getTeamCardData('changeCaptain')
  }
  if (msg === '')
    ElMessage.info("取消编辑")
}
provide("getData", getData)
provide("cancelEdit", cancelEdit)
provide("getTeamMember", getTeamMember)
provide("getTeamTeacher", getTeamTeacher)
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>

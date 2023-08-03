<template>
    <el-dialog title="none" width="80%" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true"
        :align-center="true" :close-on-press-escape="false">
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">编辑团队</h4>
            </div>
        </template>
        <div class="dialog-content">
            <el-row justify="center" class="content">
                <el-col :span="9">
                    <div class="grid-content">
                        <el-form ref="FormRef" :model="form" label-width="120px" :rules="rules" class="demo-ruleForm"
                            status-icon size="large" label-position="left">
                            <el-form-item label="团队名称" prop="name">
                                <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="团队logo" prop="logoURL">
                                <UploadLogo :form="form" :file-list="fileList" :test="1"></UploadLogo>
                            </el-form-item>
                            <el-form-item label="团队描述" prop="desc">
                                <el-input v-model="form.desc" :rows="6" maxlength="100" show-word-limit type="textarea"
                                    resize="none" />
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="15">
                    <AddCollapse :teamData="teamData" :id="id" :teamName="teamName" :teamMember="teamMember"
                        :teamTeacher="teamTeacher"></AddCollapse>
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm(FormRef)">保存</el-button>
                <el-button @click="resetForm(FormRef)">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import UploadLogo from '../UploadLogo.vue'
import AddCollapse from './AddCollapse.vue'
import { ref, reactive, onMounted, provide } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'

const props = defineProps({
    id: {
        type: Number
    }
})

const teamData = reactive({
    leader: <{ name: string, major: string }>{},
    member: <{ name: string, major: string, id: number, studentNumber: string }[]>[],
    teacher: <{ name: string, department: string, position: string }>{}
})
const fileList = ref<object[]>([])
const teamMember = ref()
const teamTeacher = ref()
const teamName = ref()
const getData = (message = '') => {
    axios.get(`http://localhost:3000/teams?id=${props.id}`)
        .then(res => {
            teamName.value = form.name = res.data[0].name
            form.desc = res.data[0].desc
            // form.logoURL = res.data[0].logoURL
            form.logo = res.data[0].logo
            // imageUrl.value = form.logoURL
            fileList.value = [res.data[0].logo]
            teamData.leader = res.data[0].leader
            setTimeout(() => {
                axios.get(`http://localhost:3000/students?team=${res.data[0].name}`)
                    .then(res => {
                        teamData.member = res.data
                        teamMember.value = teamData.member
                        // console.log(res)
                        if (message === "delete") ElMessage.success("成员变更成功")
                        else if (message === "AddMember") ElMessage.success("添加成员成功")
                    })
                    .catch(err => console.log(err))
            }, 1000)
            setTimeout(() => {
                axios.get(`http://localhost:3000/teachers?team=${res.data[0].name}`)
                    .then(res => {
                        if (res.data.length !== 0) {
                            teamData.teacher = res.data[0]
                            teamTeacher.value = teamData.teacher
                        }
                        // console.log(res)
                        if (message === "AddTeacher") ElMessage.success("添加指导老师成功")
                    })
                    .catch(err => console.log(err))
            }, 1000)
        })
        .catch(err => console.log(err))
}
onMounted(() => {
    getData()
})
//表单校验
const logoValidator = (rule: any, value: any, callback: any) => {
    if (value === false)
        callback(new Error("请上传团队logo"));
    else
        callback()
}
const rules = reactive({
    name: [{ required: true, message: '请输入团队名称', trigger: 'blur' }, { min: 1, max: 20, message: '长度不可以超过20位', trigger: 'blur' }],
    logoURL: [{ required: true, validator: logoValidator, trigger: 'blur' }],
    desc: [{ required: true, message: '请输入团队描述', trigger: 'blur' }, { min: 10, max: 200, message: '内容至少为10位', trigger: 'blur' }]
})
//表单
const emit = defineEmits(['isShow', 'getNewData'])
interface RuleForm {
    name: string
    logo: any
    desc: string
}
const FormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
    name: '',
    logo: '',
    desc: '',
})
const submitForm = (formEl: FormInstance | undefined) => {
    formEl?.validate().then(res => {
        emit("isShow")
        axios.patch(`http://localhost:3000/teams/${props.id}`, {
            name: form.name,
            desc: form.desc,
            // logoURL: base64.value
            logo: form.logo
        })
            .then(res => {
                emit('getNewData', 'EditTeam')
                getData()
            })
            .catch(err => console.log(err))
    }).catch(err => {
        ElMessage.error("请正确填写团队信息!")
    })
}
function resetForm(formEl: FormInstance | undefined) {
    emit("isShow")
    getData()
    ElMessage.info("取消编辑")
}
provide("getData", getData)
</script>

<style lang="scss" scoped>
.dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

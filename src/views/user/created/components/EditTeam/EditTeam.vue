<template>
    <el-dialog title="none" width="80%" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true"
        :align-center="true" :close-on-press-escape="false">
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
                                <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="团队logo" prop="logo">
                                <UploadLogo :form="form" :logoFile="logoFile"></UploadLogo>
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
                <el-button type="primary" @click="submitEdit(formRef)">保存</el-button>
                <el-button @click="cancelEdit">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import UploadLogo from '../../../components/UploadLogo.vue'
import AddCollapse from './AddCollapse.vue'
import { ref, reactive, onMounted, provide, inject, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import validator from '../../../validator/name/index'

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
const logoFile = ref<object[]>([])
const teamMember = ref()
const teamTeacher = ref()
const teamName = ref()
const getData = (msg = '') => {
    axios.get(`http://localhost:3000/teams?id=${props.id}`)
        .then(res => {
            teamName.value = form.name = res.data[0].name
            form.desc = res.data[0].desc
            // form.logoURL = res.data[0].logoURL
            form.logo = res.data[0].logo
            // imageUrl.value = form.logoURL
            logoFile.value = [res.data[0].logo]
            teamData.leader = res.data[0].leader
            teamMember.value = teamData.member = res.data[0].member
            teamTeacher.value = teamData.teacher = res.data[0].teacher
            if (msg === "Delete") ElMessage.success("成员变更成功")
            else if (msg === "AddMember") ElMessage.success("发送邀请成员消息成功")
            else if (msg === "AddTeacher") ElMessage.success("发送邀请指导老师消息成功")
        })
        .catch(err => {
            console.error(err)
            ElMessage.error(err)
        })
}
onMounted(() => {
    getData()
})
//表单校验
// const nameValidator = (rule: any, value: any, callback: any) => {
//     let temp = value.match(/\w+/g)
//     let [rawLength, tempLength, totalLength] = [0, 0, 0]
//     console.log(rawLength, tempLength, totalLength)
//     if (temp !== null) {
//         temp.map(item => {
//             rawLength += item.length
//             tempLength += Math.round(item.length / 2)
//         })
//         totalLength = value.length - rawLength + tempLength
//     }
//     console.log(totalLength)
//     if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value))
//         callback(new Error("团队名只能由中文、英文字母、数字以及下划线组成"));
//     else if (!(1 <= totalLength && totalLength <= 10))
//         callback(new Error("团队名长度不能超过20个字符"));
//     else
//         callback()
// }
const logoValidator = (rule: any, value: any, callback: any) => {
    if (value === false)
        callback(new Error("请上传团队logo"));
    else
        callback()
}
const nameValidator = (rule: any, value: any, callback: any) => validator(rule, value, callback)
const rules = reactive({
    name: [{ required: true, message: '请输入团队名称', trigger: 'blur' }, { validator: nameValidator, trigger: 'blur' }],
    logo: [{ required: true, validator: logoValidator, trigger: 'blur' }],
    desc: [{ required: true, message: '请输入团队描述', trigger: 'blur' }, { min: 10, max: 200, message: '内容至少为10位', trigger: 'blur' }]
})
//表单
const emit = defineEmits(['update:modelValue'])
const formRef = ref<FormInstance>()
const form = reactive<{
    name: string
    logo: any
    desc: string
}>({
    name: '',
    logo: '',
    desc: '',
})
const getTeamCardData: Function | undefined = inject("getData")
const submitEdit = (formEl: FormInstance | undefined) => {
    formEl?.validate().then(res => {
        emit('update:modelValue', false)
        axios.patch(`http://localhost:3000/teams/${props.id}`, {
            name: form.name,
            desc: form.desc,
            // logoURL: base64.value
            logo: form.logo
        })
            .then(res => {
                getTeamCardData!('EditTeam')
                getData()
            })
            .catch(err => {
                console.error(err)
                ElMessage.error(err)
            })
    }).catch(err => {
        ElMessage.error("请正确填写团队信息!")
    })
}
function cancelEdit(msg = '') {
    emit('update:modelValue', false)
    getData()
    if (msg === 'changeCaptain') {
        ElMessage.warning("您已失去管理权限")
        getTeamCardData!('changeCaptain')
    }
    else if (msg === '')
        ElMessage.info("取消编辑")
}
provide("cancelEdit", cancelEdit)
provide("getData", getData)
</script>

<style lang="scss" scoped>
.dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

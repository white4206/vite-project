<template>
    <el-dialog title="none" width="35%" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true"
        :align-center="true" :close-on-press-escape="false">
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">创建团队</h4>
            </div>
        </template>
        <div class="dialog-content">
            <el-row justify="center" class="content">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-form ref="ruleFormRef" :model="form" label-width="120px" :rules="rules" class="demo-ruleForm"
                            status-icon size="large" label-position="left">
                            <el-form-item label="团队名称" prop="name">
                                <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="团队logo" prop="logoURL">
                                <UploadLogo :form="form" :file-list="fileList"></UploadLogo>
                            </el-form-item>
                            <el-form-item label="团队描述" prop="desc">
                                <el-input v-model="form.desc" :rows="6" maxlength="100" show-word-limit type="textarea"
                                    resize="none" />
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
                <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import UploadLogo from '../../components/UploadLogo.vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
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
    name: string,
    logo: any,
    desc: string
}
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
    name: '',
    logo: '',
    desc: '',
})
const submitForm = (formEl: FormInstance | undefined) => {
    // if (JSON.stringify(form) !== '{"name":"","logo":"","desc":""}') {
    formEl?.validate().then(res => {
        axios.get(`http://localhost:3000/students?studentNumber=stu12345678`)
            .then(res => {
                emit("isShow")
                axios.post("http://localhost:3000/teams", {
                    name: form.name,
                    desc: form.desc,
                    // logoURL: base64.value
                    logo: form.logo,
                    leader: res.data[0],
                    member:[],
                    teacher:{}
                })
                    .then(res => {
                        emit('getNewData', 'AddNewTeam')
                        formEl?.resetFields()
                    })
                    .catch(err => {
                        console.error(err)
                        ElMessage.error(err)
                    })
            }).catch(err => {
                console.error(err)
                ElMessage.error(err)
            })
    }).catch(err => {
        ElMessage.error("请正确填写团队信息")
    })
}
function resetForm(formEl: FormInstance | undefined) {
    emit("isShow")
    formEl?.resetFields()
    ElMessage.info("取消创建")
}
const fileList = ref<object[]>([])
</script>


<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 125px;
    height: 125px;
    text-align: center;
}
</style>
<style lang="scss" scoped>
.avatar-uploader .avatar {
    width: 125px;
    height: 125px;
    display: block;
}

.dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

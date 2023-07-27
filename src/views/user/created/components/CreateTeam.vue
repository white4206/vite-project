<template>
    <el-dialog title="none" width="35%" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true">
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">创建团队</h4>
            </div>
        </template>
        <div class="dialog-content">
            <el-row justify="center" class="content">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-form ref="ruleFormRef" :model="form" label-width="120px" class="demo-ruleForm" status-icon
                            size="large" label-position="left">
                            <el-form-item label="团队名称" prop="name" required>
                                <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="团队logo" prop="logo">
                                <el-upload class="avatar-uploader"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                    :show-file-list="false" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon">
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="团队描述" prop="desc" required>
                                <el-input v-model="form.desc" :rows="3" maxlength="125" show-word-limit type="textarea"
                                    resize="none" />
                            </el-form-item>
                            <div class="add-box">
                                <el-collapse v-model="activeNames" accordion @change="handleChange">
                                    <el-collapse-item title="添加团队成员" name="1">
                                        <template #title>
                                            <div class="collapse-title">
                                                <el-icon color="#409EFF">
                                                    <Plus />
                                                </el-icon>添加团队成员
                                            </div>
                                        </template>
                                        <AddMember></AddMember>
                                    </el-collapse-item>
                                    <el-collapse-item title="添加指导老师" name="2">
                                        <template #title>
                                            <div class="collapse-title">
                                                <el-icon color="#409EFF">
                                                    <Plus />
                                                </el-icon>添加指导老师
                                            </div>
                                        </template>
                                        <AddTeacher></AddTeacher>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm(ruleFormRef, form)">创建</el-button>
                <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import AddTeacher from './AddTeacher.vue'
import AddMember from './AddMember.vue'
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { UploadProps } from 'element-plus'
import axios from 'axios'
//表单
const emit = defineEmits(['isShow', 'getNewData'])
interface RuleForm {
    name: string
    logo: string
    desc: string
}
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
    name: '',
    logo: '',
    desc: '',
})
const submitForm = (formEl: FormInstance | undefined, form) => {
    emit("isShow")
    axios.post("http://localhost:3000/teams", {
        name: form.name,
        desc: form.desc
    })
        .then(res => {
            emit('getNewData')
        })
        .catch(err => console.log(err))
}
function resetForm(formEl: FormInstance | undefined) {
    emit("isShow")
    if (!formEl) return
    formEl.resetFields()
}
// upload上传logo
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
//collapse折叠面板改变
const activeNames = ref([])
const handleChange = (val: string[]) => {
    console.log(val)
}
</script>

<style >
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
    width: 80px;
    height: 80px;
    text-align: center;
}

.collapse-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #409EFF;
    font-size: 14px;
}

.add-box {
    margin-bottom: 20px;
    margin-left: 120px;
}

.dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

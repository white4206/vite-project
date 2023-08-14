<template>
    <SelfInfoSkeleton :loading="loading">
        <el-form ref="formRef" :model="form" label-width="120px" label-position="left" :rules="rules" status-icon
            :size="formSize" require-asterisk-position="right">
            <el-form-item label="学号" required>
                <span class="text">{{ store.isTeacher ? store.userInformation.jobNumber :
                    store.userInformation.studentNumber }}</span>
                <!-- <span class="edit-button"><el-button type="primary" plain :icon="EditPen">编辑</el-button></span> -->
                <span v-if="!isEdit" class="edit-button" @click="handleEdit">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    编辑
                </span>
                <span v-if="isEdit" class="changePassword-button" @click="handleChangePassword">
                    修改密码
                    <el-icon>
                        <Right />
                    </el-icon>
                </span>
            </el-form-item>
            <el-form-item label="姓名" required>
                <span class="text">{{ informationData?.name }}</span>
            </el-form-item>
            <el-form-item label="学院" required>
                <span class="text">{{ informationData?.department }}</span>
            </el-form-item>
            <el-form-item label="专业" required>
                <span class="text">{{ informationData?.major }}</span>
            </el-form-item>
            <el-form-item :label="store.isTeacher ? '职称' : '年级'" required>
                <span class="text">{{ store.isTeacher ? informationData?.position : informationData?.grade }}</span>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <span v-if="!isEdit" class="text">{{ form.nickname }}</span>
                <el-input v-if="isEdit" v-model="form.nickname" />
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber">
                <span v-if="!isEdit" class="text">{{ form.phoneNumber }}</span>
                <el-input v-if="isEdit" v-model="form.phoneNumber" />
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <span v-if="!isEdit" class="text">{{ form.email }}</span>
                <el-input v-if="isEdit" v-model="form.email" />
            </el-form-item>
            <el-form-item>
                <el-button v-if="isEdit" type="primary" @click="submitEdit">保存</el-button>
                <el-button v-if="isEdit" @click="cancelEdit">取消</el-button>
            </el-form-item>
        </el-form>
    </SelfInfoSkeleton>
</template>
  
<script lang="ts" setup>
import SelfInfoSkeleton from './SelfInfoSkeleton.vue'
import { reactive, ref, onMounted } from 'vue'
import { EditPen, Right } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import axios from 'axios'
import validator from '../../validator/name/index'
import useUserStore from '../../../../store/userStore'

const store = useUserStore()
const loading = ref(true)
const informationData = ref<{
    studentNumber: string,
    name: string,
    major: string,
    department: string,
    grade: string,
    id: Number,
    [propsName: string]: any
}>()
const getData = () => {
    setTimeout(() => {
        axios.get(`http://localhost:3000/${store.isTeacher ? "teaUsers" : "users"}?username=${store.isTeacher ? store.userInformation.jobNumber : store.userInformation.studentNumber}`)
            .then(res => {
                informationData.value = res.data[0]
                form.nickname = res.data[0].nickname
                form.phoneNumber = res.data[0].phoneNumber
                form.email = res.data[0].email
                loading.value = false
            })
            .catch(err => {
                ElMessage.error(err)
                console.log(err)
            })
    }, 1000)
}
onMounted(() => {
    getData()
})
const router = useRouter()
const form = reactive({
    nickname: '',
    phoneNumber: '',
    email: '',
})
const formRef = ref()
const nameValidator = (rule: any, value: any, callback: any) => validator(rule, value, callback, 5)
const phoneNumberValidator = (rule: any, value: any, callback: any) => {
    if (!/^(0|\+86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value))
        callback(new Error("请检查号码是否正确"));
    else callback();
}
const emailValidator = (rule: any, value: any, callback: any) => {
    if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))
        callback(new Error("请检查邮箱地址是否正确"));
    else callback();
}
const rules = reactive({
    nickname: [{ required: false, validator: nameValidator, trigger: 'blur' }],
    phoneNumber: [{ required: false, validator: phoneNumberValidator, trigger: 'blur' }],
    email: [{ required: false, validator: emailValidator, trigger: 'blur' }]
})
const formSize = ref('')
const isEdit = ref(false)
const handleEdit = () => {
    isEdit.value = true
    formSize.value = 'large'
}
const handleChangePassword = () => {
    router.push("/settings")
}
const submitEdit = () => {
    if (form.nickname !== '' && form.phoneNumber !== '' && form.email !== '')
        formRef.value.validate().then(res => {
            axios.patch(`http://localhost:3000/${store.isTeacher ? "teaUsers" : "users"}/${informationData.value!.id}`, {
                nickname: form.nickname,
                phoneNumber: form.phoneNumber,
                email: form.email
            })
                .then(res => {
                    isEdit.value = false
                    getData()
                    ElMessage.success("保存成功")
                })
                .catch(err => {
                    ElMessage.error(err)
                    console.log(err)
                })
        }).catch(err => {
            ElMessage.error("请正确填写个人信息")
        })
    else {
        formRef.value.clearValidate()
        axios.patch(`http://localhost:3000/${store.isTeacher ? "teaUsers" : "users"}/${informationData.value!.id}`, {
            nickname: form.nickname,
            phoneNumber: form.phoneNumber,
            email: form.email
        })
            .then(res => {
                isEdit.value = false
                getData()
                ElMessage.success("保存成功")
            })
            .catch(err => {
                ElMessage.error(err)
                console.log(err)
            })
    }
}
const cancelEdit = () => {
    isEdit.value = false
    formSize.value = ''
    formRef.value.resetFields()
    loading.value = true
    getData()
}

</script>

<style lang="scss" scoped>
.edit-button {
    color: #606266;
    position: absolute;
    top: 0;
    right: -50px;
    transition: .4s;
}

.edit-button:hover {
    color: #409EFF;
    cursor: pointer;
    transition: .4s;
}

.changePassword-button {
    color: #606266;
    padding-left: 20px;
}

.changePassword-button:hover {
    color: #409EFF;
    cursor: pointer;
    transition: .4s;
}

.text {
    color: #606266;
}
</style>

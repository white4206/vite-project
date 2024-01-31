<template>
    <SelfInfoSkeleton :loading="loading">
        <el-form ref="formRef" :model="form" label-width="120px" label-position="left" :rules="rules" status-icon
            :size="formSize" require-asterisk-position="right">
            <el-form-item :label="store.GET_ROLE() === '1' ? '学号' : '工号'" required>
                <span class="text">{{ informationData?.username }}</span>
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
                <span class="text">{{ informationData?.nickName }}</span>
            </el-form-item>
            <el-form-item label="学院" required>
                <span class="text">{{ informationData?.college }}</span>
            </el-form-item>
            <el-form-item label="专业" required v-if="store.GET_ROLE() === '1'">
                <span class="text">{{ informationData?.major }}</span>
            </el-form-item>
            <el-form-item label="年级" required v-if="store.GET_ROLE() === '1'">
                <span class="text">{{ informationData?.grade }}</span>
            </el-form-item>
            <el-form-item label="班级" required v-if="store.GET_ROLE() === '1'">
                <span class="text">{{ informationData?.cla + '班' }}</span>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
                <span v-if="!isEdit" class="text">{{ form.tel }}</span>
                <el-input v-if="isEdit" v-model="form.tel" />
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <span v-if="!isEdit" class="text">{{ form.email }}</span>
                <el-input v-if="isEdit" v-model="form.email" />
            </el-form-item>
            <el-form-item label="银行卡号" prop="bandCard">
                <span v-if="!isEdit" class="text">{{ form.bandCard }}</span>
                <el-input v-if="isEdit" v-model="form.bandCard" />
            </el-form-item>
            <el-form-item>
                <el-button v-if="isEdit" type="primary" @click="submitEdit">保存</el-button>
                <el-button v-if="isEdit" @click="cancelEdit">取消</el-button>
            </el-form-item>
        </el-form>
    </SelfInfoSkeleton>
</template>
  
<script setup>
import SelfInfoSkeleton from './SelfInfoSkeleton.vue'
import { reactive, ref, onMounted } from 'vue'
import { EditPen, Right } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { changeInfo, getInfo } from '@/api/information.js'
import useLoginStore from '@/store/loginStore';

const store = useLoginStore()
const loading = ref(true)
const informationData = ref({
    username: '',
    nickName: '',
    major: '',
    college: '',
    grade: '',
    cla: '',
})
const getData = () => {
    getInfo()
        .then(res => {
            if (res.code === 200) {
                informationData.value = res.data
                form.email = res.data.email
                form.tel = res.data.tel
                form.bandCard = res.data.bandcard
                loading.value = false
            }
        })
        .catch(err => console.log(err))
}
onMounted(() => {
    getData()
})
const router = useRouter()
const form = reactive({
    tel: '',
    email: '',
    bandCard: ''
})
const formRef = ref()
const phoneNumberValidator = (rule, value, callback) => {
    if (!/^(0|\+86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value))
        callback(new Error("请检查号码是否正确"));
    else callback();
}
const emailValidator = (rule, value, callback) => {
    if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))
        callback(new Error("请检查邮箱地址是否正确"));
    else callback();
}
const rules = reactive({
    tel: [{ required: false, validator: phoneNumberValidator, trigger: 'blur' }],
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
    changeInfo({
        email: form.email,
        tel: form.tel,
        bandcard: form.bandCard
    })
        .then(res => {
            if (res.code === 200) {
                isEdit.value = false
                loading.value = true
                getData()
                ElMessage.success("保存成功")
            }
        })
        .catch(err => {
            console.log(err)
            ElMessage.error(err)
        })
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

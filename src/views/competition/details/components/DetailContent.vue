<template>
    <div class="main">
        <div class="top-box">
            <el-row justify="space-between">
                <el-col :span="18">
                    <div class="text-title-box">
                        <h1>{{ data?.name }}</h1>
                    </div>
                    <div class="date-box">
                        <el-icon>
                            <Clock />
                        </el-icon>
                        <span>{{ formattedStartDate }}-{{ formattedFinishDate }}</span>
                    </div>
                    <div class="signUp-box" v-if="!store.isTeacher">
                        <el-button v-if="!isSignUp" type="primary" @click="handleSignUp">申请报名</el-button>
                        <el-dropdown v-if="isSignUp" type="primary" trigger="click" @command="handleCommand">
                            <el-button type="primary" :disabled="signUpStatus === 'checking'">
                                {{ currentState }}
                                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="cancelSignUp"
                                        v-if="signUpStatus === 'waiting'">取消报名</el-dropdown-item>
                                    <el-dropdown-item command="changeSignUpInfo"
                                        v-if="signUpStatus === 'waiting'">修改报名信息</el-dropdown-item>
                                    <el-dropdown-item command="viewDetail"
                                        v-if="signUpStatus === 'teacherTurnDown'">查看详情</el-dropdown-item>
                                    <el-dropdown-item command="viewSignUpInfo"
                                        v-if="signUpStatus === 'success'">查看报名信息</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <div v-if="isSignUp" class="view-progress">
                            <el-steps :active="progressNumber"
                                :finish-status="signUpStatus === 'teacherTurnDown' ? 'error' : 'success'" align-center>
                                <el-step title="申请报名" :icon="Edit" />
                                <el-step title="老师审核" :icon="signUpStatus === 'teacherTurnDown' ? CircleClose : User" />
                                <el-step title="学院审核" :icon="Reading" />
                                <el-step title="报名成功" :icon="Check" />
                            </el-steps>
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div>
                        <img src="/src/assets/reading.png" alt=""
                            style="width:200px;max-height: 300px;margin-bottom: 35px;">
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-card class="text-content-box" shadow="always">
            <div>
                <div class="content-title">
                    <span class="title-icon">
                        <el-icon color="#337ecc">
                            <CollectionTag />
                        </el-icon>
                    </span>
                    <span>
                        <h4>活动内容</h4>
                    </span>
                </div>
                <div class="content-text">
                    {{ data?.content }}
                </div>
                <div class="content-title" v-if="true">
                    <span class="title-icon">
                        <el-icon color="#337ecc">
                            <Folder />
                        </el-icon>
                    </span>
                    <span>
                        <h4>附件列表</h4>
                    </span>
                </div>
                <div class="content-attachments">
                    <div><el-link :icon="Link" :underline="true">{{ "附件1.doc" }}</el-link></div>
                    <div><el-link :icon="Link" :underline="true">{{ "附件adagfsarfq2er1212.doc" }}</el-link></div>
                    <div><el-link :icon="Link" :underline="true">{{ "附件1adawedq2er234r4235.doc" }}</el-link></div>
                </div>
            </div>
        </el-card>
        <SignUpDialog v-model="signUp" :id="data?.id" @getData="handleGetData"></SignUpDialog>
        <ChangeInfoDialog v-model="changeInformation" :id="data?.id" @getData="handleGetData"></ChangeInfoDialog>
        <ViewDetailDialog v-model="viewDetail" v-model:isChangeInfo="changeInformation" :id="data?.id"
            @getData="handleGetData"></ViewDetailDialog>
        <ViewInfoDialog v-model="viewInformation" :id="data?.id" @getData="handleGetData"></ViewInfoDialog>
    </div>
</template>

<script lang="ts" setup>
import { Clock, CollectionTag, Link, Folder, ArrowDown, Edit, CircleClose, User, Reading, Check } from '@element-plus/icons-vue'
import SignUpDialog from './SignUpDialog.vue'
import ChangeInfoDialog from './ChangeInfoDialog.vue'
import ViewDetailDialog from './ViewDetailDialog.vue'
import ViewInfoDialog from './ViewInfoDialog.vue'
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios'
import useUserStore from '../../../../store/userStore'

const store = useUserStore()
const signUp = ref(false)
const changeInformation = ref(false)
const viewDetail = ref(false)
const viewInformation = ref(false)
const props = defineProps({
    data: {
        type: Object
    },
    isSignUp: {
        type: Boolean
    }
})
const emit = defineEmits(['update:isSignUp'])
const signUpStatus = ref()
const getData = () => {
    axios.get(`http://localhost:3000/competitions?id=${props.data!.id}`)
        .then(res => {
            res.data[0].signUpList.map(item => {
                if (item.leaderId === store.userInformation.id) {
                    signUpStatus.value = item.signUpStatus
                }
            })
        })
        .catch(err => {
            ElMessage.error(err)
            console.log(err)
        })
}
onMounted(() => {
    getData()
})
const handleGetData = () => {
    getData()
}
const currentState = computed(() => {
    if (props.isSignUp && signUpStatus.value === 'waiting')
        return '待审核'
    else if (props.isSignUp && signUpStatus.value === 'teacherTurnDown')
        return '被驳回'
    else if (props.isSignUp && signUpStatus.value === 'checking')
        return '审核中'
    else if (props.isSignUp && signUpStatus.value === 'success')
        return '报名成功'
})
const progressNumber = computed(() => {
    if (signUpStatus.value === 'success')
        return 4
    else if (signUpStatus.value === 'checking')
        return 2
    else if (signUpStatus.value === 'teacherTurnDown')
        return 2
    else if (signUpStatus.value === 'waiting')
        return 1
    else
        return 0

})
const formattedStartDate = computed(() => {
    return props.data?.startDate.split('-').join('.')
})
const formattedFinishDate = computed(() => {
    return props.data?.finishDate.split('-').join('.')
})
const handleCommand = (command) => {
    if (command === "cancelSignUp")
        ElMessageBox.confirm(
            '确认取消报名吗？ 取消后需要重新提交申请！',
            '警告',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                axios.get(`http://localhost:3000/competitions?id=${props.data!.id}`)
                    .then(res => {
                        let tempSignUpList = res.data[0].signUpList
                        tempSignUpList.map((item, index) => {
                            if (item.leaderId === store.userInformation.id)
                                tempSignUpList.splice(index, 1)
                        })
                        axios.patch(`http://localhost:3000/competitions/${props.data!.id}`, {
                            signUpList: tempSignUpList
                        })
                            .then(res => {
                                emit('update:isSignUp', false)
                                ElMessage.success("取消报名成功")
                            })
                            .catch(err => {
                                console.error(err)
                                ElMessage.error(err)
                            })
                    })
                    .catch(err => {
                        console.error(err)
                        ElMessage.error(err)
                    })
            })
            .catch(() => {
                ElMessage.info("取消操作")
            })
    else if (command === "changeSignUpInfo") {
        changeInformation.value = true
    }
    else if (command === "viewDetail") {
        viewDetail.value = true
    }
    else if (command === "viewSignUpInfo") {
        viewInformation.value = true
    }
}
const handleSignUp = () => {
    signUp.value = true
}


</script>

<style lang="scss" scoped>
.top-box {
    margin: 0 20px;
}

.text-title-box {
    color: #303133;
    margin: 50px 0 20px 0;
}

.text-content-box {
    border-radius: 15px;
    padding: 20px;
}

.date-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    color: #606266;
    margin-bottom: 50px;

    span {
        padding-left: 5px;

    }
}

.signUp-box {
    margin-bottom: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.view-progress {
    width: 45%;
    background-color: white;
    padding-top: 20px;
    margin: 0 20px;
    border-radius: 20px;
}

.content-title {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ecf5ff;
    padding: 5px;
    border-radius: 50%;
    margin-right: 4px;
}

.content-text {
    padding: 20px 30px;
}

.content-attachments {
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
}
</style>

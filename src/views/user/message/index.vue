<template>
    <div class="message-box">
        <div class="message-content-box">
            <el-row justify="space-around">
                <el-col :span="8">
                    <div class="messageList-box">
                        <Sidebar :data="messageData"></Sidebar>
                        <Pagination :messageCount="totalCount"></Pagination>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div>
                        <router-view></router-view>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue';
import Pagination from './components/Pagination.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '../../../store/userStore'

const store = useUserStore()
const messageData = ref<{
    id: number,
    isReply: string
}[]>([])
const totalCount = ref()
const getData = (page = 1) => {
    axios.get(`http://localhost:3000/messages?_page=${page}&_limit=5`)
        .then(res => {
            totalCount.value = Number(res.headers["x-total-count"])
            res.data.map(item => {
                let tempMessageData = {
                    id: 0,
                    isReply: ""
                }
                if (item.addresseeId === store.userInformation.id && UserType.value === item.type) {
                    tempMessageData.id = item.id
                    messageData.value.push(tempMessageData)
                }
                else if (store.isTeacher ? item.sender.jobNumber === store.userInformation.jobNumber : item.sender.studentNumber === store.userInformation.studentNumber && item.isReply !== 'waiting') {
                    tempMessageData.id = item.id
                    tempMessageData.isReply = item.isReply
                    messageData.value.push(tempMessageData)
                }
            })
        })
        .catch(err => {
            ElMessage.error(err)
            console.error(err)
        })
}
const UserType = ref()
onMounted(() => {
    if (store.userInformation.isTeacher)
        UserType.value = 'teacher'
    else
        UserType.value = 'member'
    getData()
})
</script>
<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.message-box {
    min-height: 100%;
    border-left: none;
}

.message-content-box {
    border-radius: 15px;
    background-color: #FFFFFF;
    border: 1px solid #DCDFE6;
}

.messageList-box {
    border: 1px solid #F2F6FC;
}
</style>
  

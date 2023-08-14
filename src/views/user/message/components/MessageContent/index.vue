<template>
    <InviteMsgContent v-if="messageData.isReply === 'waiting'" :data="messageData"></InviteMsgContent>
    <ReplyMsgContent
        v-if="messageData.isReply !== 'waiting' && store.userInformation.studentNumber === messageData.sender.studentNumber"
        :data="messageData"></ReplyMsgContent>
    <ResultMsgContent
        v-if="messageData.isReply !== 'waiting' && store.isTeacher ? store.userInformation.jobNumber === messageData.addressee.jobNumber : store.userInformation.studentNumber === messageData.addressee.studentNumber && UserType === messageData.type"
        :data="messageData">
    </ResultMsgContent>
</template>

<script lang="ts" setup>
import InviteMsgContent from './components/InviteMsgContent.vue'
import ReplyMsgContent from './components/ReplyMsgContent.vue'
import ResultMsgContent from './components/ResultMsgContent.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import useUserStore from '../../../../../store/userStore'

const store = useUserStore()
const route = useRoute()
const messageData = ref({
    sender: {
        name: "",
        avatarUrl: "",
        nickname: "",
        phoneNumber: "",
        email: "",
        studentNumber: ""
    },
    addressee: {
        name: "",
        avatarUrl: "",
        nickname: "",
        phoneNumber: "",
        email: "",
        jobNumber: "",
        studentNumber: ""
    },
    team: {},
    type: "",
    isReply: ""
})
watch(route, () => {
    getData()
})
const getData = () => {
    messageData.value = {
        sender: {
            name: "",
            avatarUrl: "",
            nickname: "",
            phoneNumber: "",
            email: "",
            studentNumber: ""
        },
        addressee: {
            name: "",
            avatarUrl: "",
            nickname: "",
            phoneNumber: "",
            email: "",
            jobNumber: "",
            studentNumber: ""
        },
        team: {},
        type: "",
        isReply: ""
    }
    axios.get(`http://localhost:3000/messages?id=${route.params.Mid}`)
        .then(res => {
            if (res.data[0]) {
                messageData.value!.sender = res.data[0].sender
                messageData.value!.isReply = res.data[0].isReply
                messageData.value!.type = res.data[0].type
                if (res.data[0].isReply !== 'waiting')
                    if (res.data[0].type === 'member')
                        axios.get(`http://localhost:3000/users?id=${res.data[0].addresseeId}`)
                            .then(res => {
                                messageData.value.addressee = {
                                    name: res.data[0].name,
                                    avatarUrl: res.data[0].avatar.url === undefined ? "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" : res.data[0].avatar.url,
                                    nickname: res.data[0].nickname === '' ? "未完善" : res.data[0].nickname,
                                    phoneNumber: res.data[0].phoneNumber === '' ? "未完善" : res.data[0].phoneNumber,
                                    email: res.data[0].email === '' ? "未完善" : res.data[0].email,
                                    studentNumber: res.data[0].studentNumber,
                                    jobNumber: ""
                                }
                            })
                            .catch(err => {
                                console.error(err)
                                ElMessage.error(err)
                            })
                    else
                        axios.get(`http://localhost:3000/teaUsers?id=${res.data[0].addresseeId}`)
                            .then(res => {
                                messageData.value.addressee = {
                                    name: res.data[0].name,
                                    avatarUrl: res.data[0].avatar.url === undefined ? "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" : res.data[0].avatar.url,
                                    nickname: res.data[0].nickname === '' ? "未完善" : res.data[0].nickname,
                                    phoneNumber: res.data[0].phoneNumber === '' ? "未完善" : res.data[0].phoneNumber,
                                    email: res.data[0].email === '' ? "未完善" : res.data[0].email,
                                    studentNumber: "",
                                    jobNumber: res.data[0].jobNumber
                                }
                            })
                            .catch(err => {
                                console.error(err)
                                ElMessage.error(err)
                            })
                axios.get(`http://localhost:3000/teams?id=${res.data[0].teamId}`)
                    .then(res => {
                        messageData.value!.team = {
                            name: res.data[0].name,
                            logoUrl: res.data[0].logo.url,
                            member: res.data[0].member
                        }
                    })
                    .catch(err => {
                        console.error(err)
                        ElMessage.error(err)
                    })
            }
        })
        .catch(err => {
            console.error(err)
            ElMessage.error(err)
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
</style>

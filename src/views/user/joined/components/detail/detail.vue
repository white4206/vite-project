<template>
    <el-dialog title="none" :show-close="true" :close-on-click-modal="false" :destroy-on-close="true" 
        :close-on-press-escape="false" style="border-radius: 15px;">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h1 :id="titleId" :class="titleClass">团队详情</h1>
            </div>
        </template>
        <div class="dialog-content">
            <el-row justify="center" class="content" :gutter="20">
                <el-col :span="24">
                    <TeamMember :memberData="memberData"></TeamMember>
                    <TeamTeacher :memberData="memberData"></TeamTeacher>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" v-if="JSON.stringify(signUpDetailList) !== '[]'">
                    <h3>报名状态:</h3>
                    <div v-for="(item, index) in  signUpDetailList">
                        <div style="margin-top: 20px;padding-left:75px;">{{ matchDetailList[index].match.matchName }}
                            <el-tag effect="plain" :type="signUpStateType(item.isPass)">{{ signUpState(item.isPass)
                            }}</el-tag>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <div class="dialog-footer">

            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TeamMember from './TeamMember.vue'
import TeamTeacher from './TeamTeacher.vue';
import { joinedTeamDetail } from '@/api/team.js'
import { competitionsDetail } from '@/api/competition.js'

const props = defineProps({
    id: {
        type: Number
    }
})
const memberData = ref({
    leader: {},
    member: [],
    teacher: []
})
const signUpDetailList = ref([])
const matchDetailList = ref([])
const signUpState = (isPass) => {
    if (isPass === -1)
        return '审核失败'
    else if (isPass === 0)
        return '等待老师审核'
    else if (isPass === 1)
        return '等待竞赛管理员审核'
    else if (isPass === 2)
        return '报名成功'
}
const signUpStateType = (isPass) => {
    if (isPass === -1)
        return 'error'
    else if (isPass === 0)
        return 'primary'
    else if (isPass === 1)
        return 'primary'
    else if (isPass === 2)
        return 'success'
}
const getData = () => {
    joinedTeamDetail(props?.id)
        .then(res => {
            if (res.code === 200) {
                memberData.value.teacher = res.data.guider
                res.data.stumember.map(item => {
                    if (item.manager === 1)
                        memberData.value.leader = item
                    else
                        memberData.value.member.push(item)
                })
            }
            console.log("成员")
          console.log(memberData)
        })
        .catch(err => console.log(err))
}
onMounted(() => {
    getData()
})
</script>

<style>
</style>

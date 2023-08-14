<template>
    <el-dialog title="none" :show-close="true" :close-on-click-modal="false" :destroy-on-close="true" :align-center="true"
        :close-on-press-escape="false">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h4 :id="titleId" :class="titleClass">团队详情</h4>
            </div>
        </template>
        <div class="dialog-content">
            <el-row justify="center" class="content">
                <el-col :span="24">
                    <TeamMember :teamData="teamData"></TeamMember>
                    <TeamTeacher :teamData="teamData"></TeamTeacher>
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <div class="dialog-footer">

            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import TeamMember from './TeamMember.vue'
import TeamTeacher from './TeamTeacher.vue';

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
const getData = () => {
    axios.get(`http://localhost:3000/teams?id=${props.id}`)
        .then(res => {
            teamData.leader = res.data[0].leader
            teamData.member = res.data[0].member
            teamData.teacher = res.data[0].teacher
        })
        .catch(err => {
            console.error(err)
            ElMessage.error(err)
        })
}
onMounted(() => {
    getData()
})
</script>

<style>
</style>

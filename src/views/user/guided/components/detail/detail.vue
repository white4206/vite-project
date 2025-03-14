<template>
  <el-dialog title="none" :show-close="true" :close-on-click-modal="false" :destroy-on-close="true"
             :close-on-press-escape="false">
    <template #header="{ close, titleId, titleClass }">
      <div>
        <h4 :id="titleId" :class="titleClass">团队详情</h4>
      </div>
    </template>
    <div class="dialog-content">
      <el-row justify="center" class="content">
        <el-col :span="24">
          <TeamMember :memberData="memberData"></TeamMember>
          <TeamTeacher :memberData="memberData"></TeamTeacher>
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
import {ref, onMounted} from 'vue'
import TeamMember from './TeamMember.vue'
import TeamTeacher from './TeamTeacher.vue'
import {joinedTeamDetail} from '@/api/team.js'

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
      })
      .catch(err => console.log(err))
}
onMounted(() => {
  getData()
})
</script>

<style>
</style>

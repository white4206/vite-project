<template>
  <div class="team-teacher">
    <el-row class="content" :gutter="10">
      <el-col :span="12" v-for="(item, index) in teacherData" style="margin-top: 10px;">
        <el-card shadow="hover" :body-style="{
                    'padding': '15px 10px'
                }" style="margin: 0px 0;">
                    <span class=" team-teacher-card">
                        <div style="margin-right: 10px">
                            <el-avatar :size="50" src="/src/assets/head.jpg"/>
                        </div>
                        <div>
                            <div style="padding-bottom: 5px;">
                                <span style="padding-right:10px">{{ item.memberName }}</span>
                                <el-tag class="teacher-tag" type="primary">老师</el-tag>
                            </div>
                            <span class="small-text">{{ item.memberCollege }}</span>
                          <!-- <div class="small-text">{{ item.membermajor }}</div> -->
                        </div>
                        <div class="close-icon" @click="handleDeleteTeacher(item.userId)">
                            <el-icon>
                                <Close/>
                            </el-icon>
                        </div>
                    </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {Close} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus';
import {inject} from 'vue';
import {deleteTeacher} from '@/api/team.js'

const props = defineProps({
  teacherData: {
    type: Object
  },
  id: {
    type: Number
  }
})
const getTeamData = inject("getData")
const handleDeleteTeacher = (id) => {
  console.log(props.id,id)
  deleteTeacher(props.id, id)
      .then(res => {
        if (res.code === 200)
          ElMessage.success('指导老师变动成功')
        getTeamData()
      })
      .catch(err => {
        console.log(err)
        ElMessage.error(err)
      })
}
</script>

<style lang="scss" scoped>
.team-teacher {
  margin: 5px
}

.team-teacher-card {
  display: flex;
  flex-direction: row;
  position: relative;
}

.teacher-tag {
  width: 75px;
  position: absolute;
  top: -15px;
  left: -30px;
  transform: rotate(-35deg);
}

.close-icon {
  position: absolute;
  top: -5px;
  right: -5px;
  opacity: 0.4;
}

.close-icon:hover {
  opacity: 0.8;
}

.small-text {
  color: #73767a;
  font-size: 12px;
}
</style>

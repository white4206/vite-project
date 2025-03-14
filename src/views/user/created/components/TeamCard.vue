<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-header-title">
          <span>
            <img :src="'http://140.143.139.167:/springboot/file/head-img/团队logo.jpg'"
                 :alt="data?.groupName"
                 width="25">
          </span>
          {{ data?.groupName }}
        </span>
        <span>
          <el-button type="primary" :icon="Edit" circle @click="handleEdit"></el-button>
          <el-button type="danger" :icon="Delete" circle @click="handleDelete"></el-button>
        </span>
      </div>
    </template>
    <div class="item">
      <el-tag size="large" round hit @click="viewMatchDetail" class="tag-button">
        <div style="display: flex;align-items: center;">
          查看参赛信息
          <el-icon>
            <ArrowRightBold/>
          </el-icon>
        </div>
      </el-tag>
    </div>
    <div class="item">
      <el-tag size="large" round hit @click="viewAwardRecord" class="tag-button" type="warning">
        <div style="display: flex;align-items: center;">
          查看获奖记录
          <el-icon>
            <ArrowRightBold/>
          </el-icon>
        </div>
      </el-tag>
    </div>
  </el-card>
  <MatchDetails v-model="isViewMatch" :id="id"></MatchDetails>
  <AwardRecord v-model="isViewAward" :id="id"></AwardRecord>
  <EditTeam v-model="isEdit" :id="id"></EditTeam>
  <Detail v-model="isOpen" :id="id"></Detail>
</template>

<script setup>
import {ref} from 'vue'
import {ArrowRightBold} from '@element-plus/icons-vue'
import EditTeam from './EditTeam/EditTeam.vue'
import MatchDetails from './MatchDetails.vue'
import AwardRecord from './AwardRecord.vue'
import {Delete, Edit} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {deleteTeam} from '@/api/team.js'
import {teamAwards} from "@/api/award.js";
import Detail from "@/views/user/created/components/detail/Detail.vue";

const props = defineProps({
  data: {
    type: Object,
  },
  id: {
    type: Number
  }
})
const emit = defineEmits(['getData'])
const handleDelete = () => {
  ElMessageBox.confirm(
      '确认删除该团队吗? 删除后不可恢复!',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteTeam(props.id).then(res => {
          ElMessage.success(res.data)
          emit('getData')
        }).catch(err => console.log())
      })
      .catch(() => {
        ElMessage.info("取消删除")
      })
}
const isEdit = ref(false)
const isOpen = ref(false)
const handleEdit = () => {
  teamAwards(props.id)
      .then(res => {
        if (res.code === 200) {
          if (JSON.stringify(res.data) === '[]')
            isEdit.value = true
          else {
            ElMessage.warning("当前队伍已参加比赛,不可编辑队伍信息!")
            isOpen.value = true
          }
        }
      })
      .catch(err => console.log(err))
}

const isViewMatch = ref(false)
const viewMatchDetail = () => {
  isViewMatch.value = true
}

const isViewAward = ref(false)
const viewAwardRecord = () => {
  isViewAward.value = true
}
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-title {
  display: flex;
  align-items: center;

  span {
    padding-right: 5px;
  }
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 350px;
  height: 230px;
  margin: 10px 20px;
}

.tag-button {
  transition: .4s;
}

.tag-button:hover {
  cursor: pointer;
  transform: translate(10px);
  background-color: #ffffff;
  transition: .4s;
}
</style>
  
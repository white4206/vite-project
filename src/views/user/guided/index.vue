<template>
  <div class="guidedTeamCard-box" v-loading="loading" v-if="JSON.stringify(guidedTeamData) !== '[]'">
    <template v-for="(item, index) in guidedTeamData" :key="item?.id">
      <GuidedTeamCard :data="item" :id="item?.id"></GuidedTeamCard>
    </template>
  </div>
  <div class="guidedTeamCard-box-empty" v-loading="loading" v-else>
    <el-empty description="暂未指导任何团队"></el-empty>
  </div>
</template>

<script setup>
import GuidedTeamCard from './components/GuidedTeamCard.vue';
import {joinedTeams} from '@/api/team.js'
import {ElMessage} from 'element-plus';
import {onMounted, ref} from 'vue';

const loading = ref(true)
const guidedTeamData = ref([])
const getData = () => {
  joinedTeams()
      .then(res => {
        console.log("指导")
        console.log(res.data)
        if (res.code === 200) {
          guidedTeamData.value = res.data
          loading.value = false
        }
      })
      .catch(err => console.log(err))
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.guidedTeamCard-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 100%
}

.guidedTeamCard-box-empty {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 100%
}
</style>

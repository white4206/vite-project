<template>
    <div class="joinedTeamCard-box" v-loading="loading" v-if="JSON.stringify(joinedTeamData) !== '[]'">
        <template v-for="(item, index) in joinedTeamData" :key="item?.id">
            <JoinedTeamCard :data="item" :id="item?.id"></JoinedTeamCard>
        </template>
    </div>
    <div class="joinedTeamCard-box-empty" v-loading="loading" v-else>
        <el-empty description="暂未加入任何团队"></el-empty>
    </div>
</template>

<script setup>
import JoinedTeamCard from './components/JoinedTeamCard.vue';
import { joinedTeams } from '@/api/team.js'
import { onMounted, ref } from 'vue';

const loading = ref(true)
const joinedTeamData = ref()
const getData = () => {
    joinedTeams()
        .then(res => {
            if (res.code === 200) {
                joinedTeamData.value = res.data
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
.joinedTeamCard-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 100%
}
.joinedTeamCard-box-empty {
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 100%
}
</style>

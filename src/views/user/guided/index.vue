<template>
    <div class="joinedTeamCard-box" v-loading="loading">
        <template v-for="(item, index) in guidedTeamData" :key="item?.id">
            <GuidedTeamCard :data="item" :id="item?.id"></GuidedTeamCard>
        </template>
    </div>
</template>

<script setup>
import GuidedTeamCard from './components/GuidedTeamCard.vue';
import { joinedTeams } from '@/api/team.js'
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const loading = ref(true)
const guidedTeamData = ref([])
const getData = () => {
    joinedTeams()
        .then(res => {
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
.joinedTeamCard-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 100%
}
</style>

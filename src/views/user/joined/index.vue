<template>
    <div class="joinedTeamCard-box" v-loading="loading">
        <template v-for="(item, index) in joinedTeamData" :key="item.id">
            <JoinedTeamCard :data="item"></JoinedTeamCard>
        </template>
    </div>
</template>

<script setup>
import JoinedTeamCard from './components/JoinedTeamCard.vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const loading = ref(true)
const joinedTeamData = ref([])
const getData = () => {
    setTimeout(() => {
        axios.get(`http://localhost:3000/teams`)
            .then(res => {
                joinedTeamData.value = []
                res.data.map(item => {
                    let isJoined = false
                    item.member.map(item => {
                        if (item.studentNumber === "stu12345678")
                            isJoined = true
                    })
                    if (isJoined)
                        joinedTeamData.value.push(item)
                });
                loading.value = false
            })
            .catch(err => {
                console.error(err)
                ElMessage.error(err)
            })
    }, 1000)
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
}
</style>

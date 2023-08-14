<template>
    <div class="joinedTeamCard-box" v-loading="loading">
        <template v-for="(item, index) in guidedTeamData" :key="item.id">
            <JoinedTeamCard :data="item" :id="item.id"></JoinedTeamCard>
        </template>
    </div>
</template>

<script setup>
import JoinedTeamCard from './components/JoinedTeamCard.vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import useUserStore from '../../../store/userStore'

const store = useUserStore()
const loading = ref(true)
const guidedTeamData = ref([])
const getData = () => {
    setTimeout(() => {
        axios.get(`http://localhost:3000/teams`)
            .then(res => {
                guidedTeamData.value = []
                res.data.map(item => {
                    if (item.teacher.jobNumber === store.userInformation.jobNumber)
                        guidedTeamData.value.push(item)
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
    min-height: 100%
}
</style>

<template>
    <!-- <CreateProject></CreateProject> -->
    <div class="created-box" v-loading="loading">
        <template v-for="(item, index) in teamData" :key="item.id">
            <TeamCard :data="item" :index="item.id" @getNewData="handleGet">
            </TeamCard>
        </template>
        <CreateCard @click="dialogTableVisible = true">
        </CreateCard>
        <el-dialog v-model="dialogTableVisible" title="none" width="25%" :show-close="false" :close-on-click-modal="false">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h4 :id="titleId" :class="titleClass">温馨提示
                    </h4>
                    <div class="close-button" @click="close">
                        <el-icon color="red" size="20">
                            <Close />
                        </el-icon>
                    </div>
                </div>
            </template>
            <div class="dialog-content">
                <div class="dialog-content-text">
                    <div>
                        请确保你是团队负责人,
                    </div>
                    <div>是否继续?</div>
                </div>
            </div>
            <template #footer>
                <div class="dialog-content-button">
                    <el-button type="primary" @click="handleCreate">继续创建</el-button>
                </div>
            </template>
        </el-dialog>
        <CreateTeam v-model="isCreate" @isShow="handleShow" @getNewData="handleGet"></CreateTeam>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import CreateCard from './components/CreateCard.vue';
import TeamCard from './components/TeamCard.vue';
import { Close } from '@element-plus/icons-vue'
import CreateTeam from './components/CreateTeam.vue';
import axios from 'axios';
const loading = ref(true)
interface iTeamData {
    name: string,
    desc: string,
    id: number,
    [propsName: string]: any
}
const teamData = ref<iTeamData[]>()
var timer: number
const getData = () => {
    timer = setInterval(() => {
        axios.get("http://localhost:3000/teams")
            .then(res => {
                teamData.value = res.data
                loading.value = false
                clearInterval(timer)
            })
            .catch(err => console.log(err))
    }, 1000)
}
onMounted(() => {
    getData()
})
const handleGet = () => {
    loading.value = true
    getData()
}
const dialogTableVisible = ref(false)
const isCreate = ref(false)
const handleCreate = () => {
    isCreate.value = true
    dialogTableVisible.value = false
}
const handleShow = () => {
    isCreate.value = false
}
</script>

<style lang="scss" scoped>
.created-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #dedfe0;
}

.dialog-content-text {
    font-size: 16px;
    padding: 0 10px;
}

.dialog-content-button {
    text-align: center;
}

.close-button {
    opacity: 0.4;
}

.close-button:hover {
    opacity: 0.8;
}
</style>

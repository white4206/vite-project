<template>
    <!-- <CreateProject></CreateProject> -->
    <div class="teamCard-box" v-loading="loading">
        <template v-for="(item, index) in teamData" :key="item.id">
            <TeamCard :data="item" :id="item.id" @getData="handleGet">
            </TeamCard>
        </template>
        <CreateCard @click="dialogTableVisible = true">
        </CreateCard>
        <el-dialog v-model="dialogTableVisible" title="none" width="25%" :show-close="false" :close-on-click-modal="false"
            style="border-radius: 15px;">
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
        <CreateTeam v-model="isCreate" @isShow="handleShow" @getData="handleGet"></CreateTeam>
    </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import CreateCard from './components/CreateCard.vue';
import TeamCard from './components/TeamCard.vue';
import { Close } from '@element-plus/icons-vue'
import CreateTeam from './components/CreateTeam.vue';
import { createdTeams } from '@/api/team.js'

const loading = ref(true)
const teamData = ref([])
const getData = () => {
    createdTeams()
        .then(res => {
            if (res.code === 200) {
                teamData.value = res.data
                loading.value = false
            }
        })
        .catch(err => {
            console.log(err)
        })
}
onMounted(() => {
    getData()
})
const handleGet = () => {
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
provide("getData", getData)
</script>

<style lang="scss" scoped>
.teamCard-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 100%
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

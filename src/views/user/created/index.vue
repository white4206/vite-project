<template>
    <!-- <CreateProject></CreateProject> -->
    <div class="teamCard-box" v-loading="loading">
        <template v-for="(item, index) in teamData" :key="item.id">
            <TeamCard :data="item" :id="item.id" @getNewData="handleGet">
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
import { ElMessage } from 'element-plus'
import { ref, onMounted, provide } from 'vue'
import CreateCard from './components/CreateCard.vue';
import TeamCard from './components/TeamCard.vue';
import { Close } from '@element-plus/icons-vue'
import CreateTeam from './components/CreateTeam.vue';
import axios from 'axios';
import useUserStore from '../../../store/userStore'

const store = useUserStore()
const loading = ref(true)
interface iTeamData {
    name: string,
    desc: string,
    id: number,
    [propsName: string]: any
}
const teamData = ref<iTeamData[]>([])
const getData = (msg = '') => {
    loading.value = true
    setTimeout(() => {
        axios.get(`http://localhost:3000/teams`)
            .then(res => {
                teamData.value = []
                res.data.map(item => {
                    if (item.leader.studentNumber === store.userInformation.studentNumber)
                        teamData.value?.push(item)
                })
                loading.value = false
                if (msg === 'delete')
                    ElMessage.success("删除成功")
                else if (msg === 'AddNewTeam') {
                    ElMessage.success("创建成功")
                }
                else if (msg === 'EditTeam')
                    ElMessage.success("编辑成功")

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
const handleGet = (msg) => {
    // loading.value = true
    getData(msg)
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

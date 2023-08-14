<template>
    <el-row justify="center">
        <el-col :span="24">
            <div class="grid-content">
                <PageHeader></PageHeader>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="24">
            <div class="table-box">
                <div class="table-title-box">
                    <div>
                        已选中 {{ selectionItems.length }} 条
                    </div>
                    <div>
                        <el-button size="default" circle plain :icon="Select" type="primary"
                            @click="handleAllPass"></el-button>
                        批量通过
                        <el-button size="default" circle plain :icon="CloseBold" type="danger"
                            @click="handleAllTurnDown"></el-button>
                        批量拒绝
                    </div>
                </div>
                <el-table ref="multipleTableRef" :data="filterTableData" style="width: 100%"
                    @selection-change="handleSelectionChange" stripe v-loading="loading">
                    <el-table-column type="selection" width="55" />
                    <el-table-column property="name" label="团队名" width="120" />
                    <el-table-column property="leader.name" label="队长" width="120" />
                    <el-table-column label="报名附件" width="225" show-overflow-tooltip>
                        <template #default="scope">
                            <el-link :icon="Link" :underline="true">{{ scope.row.file.name }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column property="desc" label="备注" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="225" align="center">
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="Type to search" />
                        </template>
                        <template #default="scope">
                            <el-button size="small" type="primary" @click="handlePass(scope.row)">通过</el-button>
                            <el-button size="small" type="danger" @click="handleTurnDown(scope.row)">拒绝</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import PageHeader from './components/PageHeader.vue'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Link, Select, CloseBold } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import useUserStore from '../../../store/userStore'


const store = useUserStore()
const route = useRoute()
const tableData = ref<{
    name: string,
    leader: object,
    desc: string,
    file: object
}[]>([])
const search = ref('')
const filterTableData = computed(() =>
    tableData.value?.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const loading = ref(true)
const getData = () => {
    tableData.value = []
    setTimeout(() => {
        axios.get(`http://localhost:3000/competitions?id=${route.params.Sid}`)
            .then(res => {
                res.data[0].signUpList.map(item => {
                    let tempCheckTeamData = {
                        name: "",
                        leader: {},
                        desc: "",
                        file: {}
                    }
                    axios.get(`http://localhost:3000/teams?id=${item.teamId}`)
                        .then(res => {
                            if (item.signUpStatus === 'waiting' && res.data[0].teacher.id === store.userInformation.id) {
                                tempCheckTeamData.desc = item.desc
                                tempCheckTeamData.file = item.file
                                tempCheckTeamData.name = res.data[0].name
                                tempCheckTeamData.leader = res.data[0].leader
                                tableData.value!.push(tempCheckTeamData)
                                loading.value = false
                            }
                        })
                        .catch(err => {
                            ElMessage.error(err)
                            console.log(err)
                        })
                })
            })
            .catch(err => {
                ElMessage.error(err)
                console.log(err)
            })
    }, 1000)
}
onMounted(() => {
    getData()
})
const handlePass = (row) => {
    axios.get(`http://localhost:3000/competitions?id=${route.params.Sid}`)
        .then(res => {
            let tempSignUpList = res.data[0].signUpList
            tempSignUpList.forEach(item => {
                if (item.leaderId === row.leader.id)
                    item.signUpStatus = "checking"
            })
            axios.patch(`http://localhost:3000/competitions/${route.params.Sid}`, {
                signUpList: tempSignUpList
            })
                .then(res => {
                    getData()
                    ElMessage.success("通过报名申请")
                })
                .catch(err => {
                    ElMessage.error(err)
                    console.log(err)
                })
        })
}
const handleTurnDown = (row) => {
    axios.get(`http://localhost:3000/competitions?id=${route.params.Sid}`)
        .then(res => {
            let tempSignUpList = res.data[0].signUpList
            tempSignUpList.forEach(item => {
                if (item.leaderId === row.leader.id)
                    item.signUpStatus = "teacherTurnDown"
            })
            axios.patch(`http://localhost:3000/competitions/${route.params.Sid}`, {
                signUpList: tempSignUpList
            })
                .then(res => {
                    getData()
                    ElMessage.warning("拒绝报名申请")
                })
                .catch(err => {
                    ElMessage.error(err)
                    console.log(err)
                })
        })
}
const selectionItems = ref([])
const handleSelectionChange = (val) => {
    selectionItems.value = val
}
const handleAllPass = () => {
    let tempSignUpList: object[] = []
    selectionItems.value.map((row: any) => {
        axios.get(`http://localhost:3000/competitions?id=${route.params.Sid}`)
            .then(res => {
                res.data[0].signUpList.forEach(item => {
                    if (item.leaderId === row.leader.id) {
                        item.signUpStatus = "checking"
                        tempSignUpList.push(item)
                    }
                })
                console.log(tempSignUpList)
                axios.patch(`http://localhost:3000/competitions/${route.params.Sid}`, {
                    signUpList: tempSignUpList
                })
                    .then(res => {
                        getData()
                    })
                    .catch(err => {
                        ElMessage.error(err)
                        console.log(err)
                    })
            })
            .catch(err => {
                ElMessage.error(err)
                console.log(err)
            })
    })
    if (JSON.stringify(selectionItems.value) !== '[]')
        ElMessage.success("批量通过报名申请")
}
const handleAllTurnDown = () => {
    let tempSignUpList: object[] = []
    selectionItems.value.map((row: any) => {
        axios.get(`http://localhost:3000/competitions?id=${route.params.Sid}`)
            .then(res => {
                res.data[0].signUpList.forEach(item => {
                    if (item.leaderId === row.leader.id) {
                        item.signUpStatus = "teacherTurnDown"
                        tempSignUpList.push(item)
                    }
                })
                console.log(tempSignUpList)
                axios.patch(`http://localhost:3000/competitions/${route.params.Sid}`, {
                    signUpList: tempSignUpList
                })
                    .then(res => {
                        getData()
                    })
                    .catch(err => {
                        ElMessage.error(err)
                        console.log(err)
                    })
            })
            .catch(err => {
                ElMessage.error(err)
                console.log(err)
            })
    })
    if (JSON.stringify(selectionItems.value) !== '[]')
        ElMessage.warning("批量拒绝报名申请")
}
</script>

<style lang="scss" scoped>
.grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-bottom: 20px;
}

.table-box {
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 15px;
}

.table-title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    color: #909399;
}

.table-title-box div:first-child {
    font-weight: bold;
}
</style>

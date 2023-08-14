<template>
    <div class="checkCompetition-card">
        <div class="competition-message">
            <!-- <el-badge :value="0">
            </el-badge> -->
            <h1>{{ waitReviewNumber }}</h1>
            待审核
        </div>
        <div class="competition-title">
            {{ data?.name }}
        </div>
        <div class="competition-date">
            <el-icon>
                <Clock />
            </el-icon>
            <span>{{ formattedStartDate }}-{{ formattedFinishDate }}</span>
        </div>
        <div class="competition-icon">
            <el-icon color="#909399">
                <ArrowRightBold />
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup >
import { ArrowRightBold, Clock } from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import useUserStore from '../../../../store/userStore'


const store = useUserStore()
const props = defineProps({
    data: {
        type: Object
    }
})
const waitReviewNumber = ref()
const tableData = ref<{
    name: string,
    leader: object,
    desc: string,
    file: object
}[]>([])
onMounted(() => {
    axios.get(`http://localhost:3000/competitions?id=${props.data!.id}`)
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
                        }
                        waitReviewNumber.value = tableData.value.length
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
})
const formattedStartDate = computed(() => {
    return props.data?.startDate.split('-').join('.')
})
const formattedFinishDate = computed(() => {
    return props.data?.finishDate.split('-').join('.')
})
</script>
<style lang="scss" scoped>
.checkCompetition-card {
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 46px;
}

.competition-message {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100px;

    h1 {
        padding: 0 20px;
    }

    // .el-badge {
    //     padding-right: 5px;
    // }
}

.competition-title {
    font-size: 18px;
    color: #303133;

    width: 500px;
    font-weight: bold;
    padding-right: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.competition-date {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    color: #909399;

    span {
        padding-left: 5px;
    }
}

.competition-icon {
    padding-right: 75px;
}
</style>

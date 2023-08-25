<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span class="card-header-title">
                    <span><img :src="data?.logoUrl ? data?.logoUrl : 'src/assets/team.png'" :alt="data?.groupname"
                            width="25"></span>
                    {{ data?.groupname }}
                </span>
                <span>
                    <el-button type="primary" :icon="Edit" circle @click="handleEdit"></el-button>
                    <el-button type="danger" :icon="Delete" circle @click="handleDelete"></el-button>
                </span>
            </div>
        </template>
        <div class="item">
            <el-tag size="large" round hit @click="viewMatchDetail" class="tag-button">
                <div style="display: flex;align-items: center;">
                    查看参赛信息
                    <el-icon>
                        <ArrowRightBold />
                    </el-icon>
                </div>
            </el-tag>
        </div>
        <div class="item">
            <el-tag size="large" round hit @click="viewAwardRecord" class="tag-button" type="warning">
                <div style="display: flex;align-items: center;">
                    查看获奖记录
                    <el-icon>
                        <ArrowRightBold />
                    </el-icon>
                </div>
            </el-tag>
        </div>
    </el-card>
    <MatchDetails v-model="isViewMatch" :id="id"></MatchDetails>
    <AwardRecord v-model="isViewAward" :id="id"></AwardRecord>
    <EditTeam v-model="isEdit" :id="id"></EditTeam>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowRightBold } from '@element-plus/icons-vue'
import EditTeam from './EditTeam/EditTeam.vue'
import MatchDetails from './MatchDetails.vue'
import AwardRecord from './AwardRecord.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteTeam } from '@/api/team.js'

const props = defineProps({
    data: {
        type: Object,
    },
    id: {
        type: Number
    }
})
const emit = defineEmits(['getData'])
const handleDelete = () => {
    ElMessageBox.confirm(
        '确认删除该团队吗? 删除后不可恢复!',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteTeam(props.id).then(res => {
                ElMessage.success(res.data.data)
                emit('getData')
            }).catch(err => console.log())
        })
        .catch(() => {
            ElMessage.info("取消删除")
        })
}
const isEdit = ref(false)
const handleEdit = () => {
    isEdit.value = true
}

const isViewMatch = ref(false)
const viewMatchDetail = () => {
    isViewMatch.value = true
}

const isViewAward = ref(false)
const viewAwardRecord = () => {
    isViewAward.value = true
}
</script>
<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header-title {
    display: flex;
    align-items: center;

    span {
        padding-right: 5px;
    }
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 350px;
    height: 230px;
    margin: 10px 20px;
}

.tag-button {
    transition: .4s;
}

.tag-button:hover {
    cursor: pointer;
    transform: translate(10px);
    background-color: #ffffff;
    transition: .4s;
}
</style>
  
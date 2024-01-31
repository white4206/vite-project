<template>
    <el-dialog title="none" width="80%" :show-close="true" :close-on-click-modal="false" :destroy-on-close="true"
        :align-center="true" :close-on-press-escape="false" style="border-radius: 15px;">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h4 :id="titleId" :class="titleClass">参赛信息</h4>
            </div>
        </template>
        <div class="dialog-content">
            <el-row justify="center" class="content">
                <el-col :span="24">
                    <div class="table-box">
                        <div class="table-title-box">
                            <div>
                                已选中 {{ selectionItems.length }} 条
                            </div>
                        </div>
                        <el-table ref="multipleTableRef" :data="filterTableData" style="width: 100%"
                            @selection-change="handleSelectionChange" stripe v-loading="loading">
                            <el-table-column type="selection" width="55" />
                            <el-table-column property="matchName" label="比赛名" width="120" />
                            <el-table-column property="signTime" label="报名时间" width="120">
                                <template #default="scope">
                                    <div>{{ scope.row.signTime?.split(' ')[0] }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column property="isPass" label="报名状态" width="120">
                                <template #default="scope">
                                    <div> <el-tag :type="signUpStateType(scope.row.isPass)">{{
                                        signUpState(scope.row.isPass)
                                    }}</el-tag></div>
                                </template>
                            </el-table-column>
                            <el-table-column label="报名附件" show-overflow-tooltip>
                                <template #default="scope">
                                    <el-link :icon="Link" :underline="true" target="_blank"
                                        :href="'http://140.143.139.167' + scope.row.signFile">{{ scope.row.filename
                                        }}</el-link>
                                </template>
                            </el-table-column>
                            <el-table-column width="225" align="center">
                                <template #header>
                                    <el-input v-model="search" size="small" placeholder="搜索报名信息" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <div class="dialog-footer">
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { cancelSignUp, signUpDetail, reSignUp } from '@/api/signUp.js'
import { Link } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
    id: {
        type: Number
    }
})

const loading = ref(true)

const tableData = ref([])
const getData = () => {
    signUpDetail(props?.id)
        .then(res => {
            if (res.code === 200) {
                tableData.value = res.data
                loading.value = false
            }
        })
        .catch(err => console.log(err))
}
onMounted(() => {
    getData()
})
const signUpState = (isPass) => {
    if (isPass === -1)
        return '审核失败'
    else if (isPass === 0)
        return '教师审核中'
    else if (isPass === 1)
        return '管理员审核中'
    else if (isPass === 2)
        return '报名成功'
}
const signUpStateType = (isPass) => {
    if (isPass === -1)
        return 'danger'
    else if (isPass === 0)
        return ''
    else if (isPass === 1)
        return ''
    else if (isPass === 2)
        return 'success'
}

const search = ref('')
const filterTableData = computed(() =>
    tableData.value?.filter(
        (data) =>
            !search.value ||
            data.matchName.toLowerCase().includes(search.value.toLowerCase())
    )
)

const selectionItems = ref([])
const handleSelectionChange = (val) => {
    selectionItems.value = val
}
</script>

<style lang="scss" scoped>
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

.table-title-box div:last-child {
    margin-right: 20px;
}
</style>

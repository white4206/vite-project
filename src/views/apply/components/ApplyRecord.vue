<template>
  <div class="dialog-content">
    <el-row justify="center" class="content">
      <el-col :span="24">
        <div class="table-box">
          <div class="table-title-box">
            <div>
              已选中 {{ selectionItems.length }} 条
            </div>
            <div style="width: 225px">
              <el-input v-model="search" size="small" placeholder="搜索报名信息"/>
            </div>
          </div>
          <el-table ref="multipleTableRef" :data="filterTableData" style="width: 100%"
                    @selection-change="handleSelectionChange" stripe v-loading="loading">
            <el-table-column type="selection" width="30"/>
            <el-table-column property="matchName" label="比赛名" align="center" width="120"/>
            <el-table-column property="groupId" label="参赛团队" align="center" width="120"/>
            <el-table-column property="takepartTime" label="参赛时间" align="center" width="120">
              <template #default="scope">
                <div>{{ scope.row.takepartTime?.split('T')[0] }}</div>
              </template>
            </el-table-column>
            <el-table-column property="awardsTime" label="获奖时间" align="center" width="120">
              <template #default="scope">
                <div>{{ scope.row.awardsTime?.split('T')[0] }}</div>
              </template>
            </el-table-column>
            <el-table-column property="isPass" label="审核状态" align="center" width="120">
              <template #default="scope">
                <div>
                  <el-tag :type="signUpStateType(scope.row.isPass)">{{
                      signUpState(scope.row.isPass)
                    }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="feedback" label="反馈信息" width="225"/>
            <el-table-column label="审核附件" show-overflow-tooltip width="120">
              <template #default="scope">
                <el-link :icon="Link" :underline="true" target="_blank"
                         :href="scope.row.file">
                  {{ scope.row.file }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column property="awardsLevel" label="获奖级别" align="center" width="120"/>
            <el-table-column property="awardsName" label="获奖名称" align="center" width="120"/>
            <el-table-column property="maxLevel" label="最高奖项级别" align="center" width="120"/>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import {Link} from "@element-plus/icons-vue";
import {ref, onMounted, computed} from 'vue'
import {getApplyRecordList} from "@/api/apply.js";

const loading = ref(true)
const applyRecordList = ref([])
const selectionItems = ref([])

const signUpState = (isPass) => {
  if (isPass === -1)
    return '审核失败'
  else if (isPass === 0)
    return '待审核'
  else if (isPass === 1)
    return '审核通过'
}
const signUpStateType = (isPass) => {
  if (isPass === -1)
    return 'danger'
  else if (isPass === 0)
    return ''
  else if (isPass === 1)
    return 'success'
}
const search = ref('')
const filterTableData = computed(() =>
    applyRecordList.value.filter(
        (data) =>
            !search.value ||
            data.matchName.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleSelectionChange = (val) => {
  selectionItems.value = val
}
const getData = () => {
  getApplyRecordList().then(res => {
    applyRecordList.value = res.data.map(item => {
      return {
        ...item,
        file: import.meta.env.VITE_BASE_URL + item.file
      }
    })
    loading.value = false
  })
}
onMounted(() => {
  getData()
})

defineExpose({
  getData
})
</script>
<style scoped lang="scss">
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
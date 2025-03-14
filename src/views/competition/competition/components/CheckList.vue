<template>
  <div>
    <el-row justify="center" style="min-height: 500px">
      <el-col :span="24">
        <div class="table-box">
          <div class="table-title-box">
            <div>
              已选中 {{ selectionItems.length }} 条
            </div>
          </div>
          <el-table ref="multipleTableRef" :data="filterTableData" style="width: 100%"
                    @selection-change="handleSelectionChange" stripe v-loading="loading">
            <el-table-column type="selection" width="55"/>
            <el-table-column property="matchName" label="比赛名" width="120"/>
            <el-table-column property="gruopName" label="团队名" width="120"/>
            <el-table-column property="leadername" label="队长" width="120"/>
            <el-table-column label="报名附件">
              <template #default="scope">
                <el-link :icon="Link" :underline="true" target="_blank"
                         :href="'http://140.143.139.167' + scope.row.signFile">{{ scope.row.fileName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column width="225" align="center">
              <template #header>
                <el-input v-model="search" size="small" placeholder="搜索报名信息"/>
              </template>
              <template #default="scope">
                <el-button size="small" type="primary" @click="handlePass(scope.row.id)">通过</el-button>
                <el-button size="small" type="danger" @click="openConfirm(scope.row.id)">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="isTurnDown" title="审核不通过" width="30%" align-center>
      <el-form :model="form" label-position="top" ref="formRef" :rules="rules">
        <el-form-item label="反馈信息" prop="feedback">
          <el-input v-model="form.feedback"/>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCancel">Cancel</el-button>
                    <el-button type="primary" @click="handleTurnDown">
                        Confirm
                    </el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import PageHeader from './PageHeader.vue'
import {computed, onMounted, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {Link} from '@element-plus/icons-vue'
import {waitCheck, teamDetail, handleCheck} from '@/api/checkSignUp.js';

const tableData = ref([])
const loading = ref(true)
const getData = () => {
  waitCheck()
      .then(res => {
        if (res.code === 200) {
          tableData.value = res.data
          if (JSON.stringify(tableData.value) !== '[]')
            tableData.value.map(tableItem => {
              teamDetail(tableItem.groupId)
                  .then(res => {
                    if (res.code === 200) {
                      tableItem.gruopName = res.data.gruopName
                      res.data.stumember.map(teamItem => {
                        if (teamItem.manager === 1) {
                          tableItem.leadername = teamItem.memberName
                        }
                      })
                      loading.value = false
                    }
                  })
            })
          else
            loading.value = false
        }
      })
}
onMounted(() => {
  getData()
})
const search = ref('')
const filterTableData = computed(() =>
    tableData.value?.filter(
        (data) =>
            !search.value ||
            data.matchName.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handlePass = (signid) => {
  handleCheck(signid, {
    status: 1
  })
      .then(res => {
        console.log(res)
        getData()
        ElMessage.success("通过报名申请")
      })
      .catch(err => console.log(err))
}
const signId = ref()
const openConfirm = (signid) => {
  isTurnDown.value = true
  signId.value = signid
}
const form = ref({
  feedback: ""
})
const formRef = ref()
const isTurnDown = ref(false)
const rules = ref({
  feedback: {required: true, message: '请输入反馈信息', trigger: 'blur'}
})
const handleTurnDown = () => {
  formRef.value.validate().then(res => {
    handleCheck(signId.value, {
      feedback: form.value.feedback,
      status: -1
    })
        .then(res => {
          console.log(res)
          getData()
          ElMessage.warning("拒绝报名申请")
        })
        .catch(err => console.log(err))
  }).catch(err => {
    ElMessage.error("请填写反馈信息")
  })
}

const handleCancel = () => {
  isTurnDown.value = false
  formRef.value.resetFields()
  ElMessage.info("取消操作")
}
const selectionItems = ref([])
const handleSelectionChange = (val) => {
  selectionItems.value = val
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

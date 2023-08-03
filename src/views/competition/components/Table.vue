<template>
    <el-table :data="filterTableData" v-loading="loading" style="width: 100%" :row-class-name="tableRowClassName"
        @row-click="handleClick($event)" :default-sort="{ prop: 'startDate', order: 'ascending' }">
        <el-table-column prop="startDate" sortable label="开始日期" width="180" />
        <el-table-column prop="finishDate" sortable label="结束日期" width="180" />
        <el-table-column prop="name" label="比赛名称" width="180" />
        <el-table-column prop="details" label="" />
        <el-table-column label="选项" align="center" width="220">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope" v-if="store.isTeacher">
                <div>
                    <el-button size="small" @click.stop="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger"
                        @click.stop="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import useTeacherStore from '../../../store/userStore';
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import diffTime from './diffTime'
import axios from 'axios'
interface User {
    startDate: string,
    finishDate: string,
    name: string,
    details: string,
    id: number,
}
const store = useTeacherStore()
const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: User
    rowIndex: number
}) => {
    let date = diffTime(new Date(), new Date(row.finishDate))
    if (date.days <= 0)
        return 'info-row'
    else if (date.days <= 1)
        return 'error-row'
    else if (date.days <= 3)
        return 'warning-row'
    else
        return 'success-row'
}
const loading = ref<boolean>(true)
const tableData = ref<User[]>([])
const getData = (message = '') => {
    setTimeout(() => {
        axios.get("http://localhost:3000/competitions")
            .then(res => {
                tableData.value = res.data
                loading.value = false
                if (message === 'delete') ElMessage.success("删除成功")
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
const search = ref('')
const filterTableData = computed(() => {
    return tableData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
}
)
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/competition/details/${evt.id}`)
}
const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    // tableData.value.splice(index, 1)
    axios.delete(`http://localhost:3000/competitions/${row.id}`)
        .then(res => {
            loading.value = true
            getData('delete')
        })
        .catch(err => {
            {
                console.error(err)
                ElMessage.error(err)
            }
            ElMessage.error("删除失败，请检查网络连接!")
        })
}
</script>
  
<style lang="scss">
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.el-table .error-row {
    --el-table-tr-bg-color: var(--el-color-error-light-9);
}

.el-table .info-row {
    --el-table-tr-bg-color: var(--el-color-info-light-9);
}
</style>
  
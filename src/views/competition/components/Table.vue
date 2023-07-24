<template>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" @row-click="handleClick($event)">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="id" label="Id" />
        <el-table-column>
            <template #default="scope" v-if="store.isTeacher">
                <div>
                    {{ store.isTeacher }}
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import useTeacherStore from '../../../store/UserStore';
import { useRouter } from 'vue-router'
interface User {
    date: string
    name: string
    address: string
    id: number
}
const store = useTeacherStore()
console.log(store)
const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: User
    rowIndex: number
}) => {
    if (rowIndex === 1) {
        return 'warning-row'
    } else if (rowIndex === 3) {
        return 'success-row'
    }
    return ''
}

const tableData: User[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        id: 1
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        id: 2
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        id: 3
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        id: 4
    },
]
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/competition/details/${evt.id}`)
}
const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}
</script>
  
<style lang="scss">
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
  
<template>
    <el-table :data="tableData" stripe style="width: 100%" @row-click="handleClick($event)">
        <el-table-column prop="date" label="开始日期" width="180" />
        <el-table-column prop="name" label="比赛名称" width="180" />
        <el-table-column prop="address" label="比赛信息" />
    </el-table>
</template>
  
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const tableData = [
    {
        date: '2016-05-03',
        name: 'web设计大赛',
        address: '...',
        id: 1
    },
    {
        date: '2016-05-02',
        name: 'web设计大赛',
        address: '...',
        id: 2
    },
    {
        date: '2016-05-04',
        name: 'web设计大赛',
        address: '...',
        id: 3
    },
    {
        date: '2016-05-01',
        name: 'web设计大赛',
        address: '...',
        id: 4
    },
]
const router = useRouter()
const handleClick = (evt) => {
    router.push(`/competition/details/${evt.id}`)
}
</script>
  
<template>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>
  
<script lang="ts" setup>
const tableData = [
    {
        date: '2016-05-03',
        name: 'web设计大赛',
        address: '...',
    },
    {
        date: '2016-05-02',
        name: 'web设计大赛',
        address: '...',
    },
    {
        date: '2016-05-04',
        name: 'web设计大赛',
        address: '...',
    },
    {
        date: '2016-05-01',
        name: 'web设计大赛',
        address: '...',
    },
]
</script>
  
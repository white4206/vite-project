<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span class="card-header-title">
                    <span><img :src="data!.logo.url" :alt="data!.name" width="25"></span>
                    {{ data!.name }}
                </span>
                <span>
                    <el-button type="primary" :icon="Edit" circle @click="handleEdit"></el-button>
                    <el-button type="danger" :icon="Delete" circle @click="handleDelete"></el-button>
                </span>
            </div>
        </template>
        <div class="text item">
            团队介绍：{{ data!.desc }}
        </div>
    </el-card>
    <EditTeam v-model="isEdit" :id="id" @isShow="handleShow" @getNewData="handleGet"></EditTeam>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import EditTeam from './EditTeam/EditTeam.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';

const props = defineProps({
    data: {
        type: Object,
    },
    id: {
        type: Number
    }
})
const emit = defineEmits(['getNewData'])
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
            axios.delete(`http://localhost:3000/teams/${props.id}`)
                .then(res => {
                    emit('getNewData', "delete")
                })
                .catch(err => console.log(err))
        })
        .catch(() => {
            ElMessage.info("取消删除")
        })
}
const isEdit = ref(false)
const handleEdit = () => {
    isEdit.value = true
}
const handleShow = () => {
    isEdit.value = false
}
const handleGet = (message) => {
    emit('getNewData', message)
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

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 350px;
    height: 230px;
    margin: 10px 20px;
}
</style>
  
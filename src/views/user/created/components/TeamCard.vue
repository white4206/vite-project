<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>{{ data.name }}</span>
                <span>
                    <el-button type="primary" :icon="Edit" circle></el-button>
                    <el-button type="danger" :icon="Delete" circle @click="handleDelete"></el-button>
                </span>
            </div>
        </template>
        <div class="text item">
            团队介绍：{{ data.desc }}
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import axios from 'axios';
const props = defineProps({
    data: {
        type: Object,
        default: { name: "name", desc: "desc" }
    },
    index: {
        type: Number
    }
})
const emit = defineEmits(['getNewData'])
const handleDelete = () => {
    axios.delete(`http://localhost:3000/teams/${props.index}`)
        .then(res => {
            emit('getNewData')
            console.log("successful delete!")
        })
        .catch(err => console.log(err))
}
</script>
<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  
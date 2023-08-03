<template>
    <div class="changeLeader-icon">
        <el-dropdown size="small" type="primary" trigger="click" @command="handleCommand">
            <el-button type="danger" plain size="small">
                变更队长
                <el-icon>
                    <Switch />
                </el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :icon="Avatar" disabled>
                        {{ teamData!.leader.name }}
                    </el-dropdown-item>
                    <el-dropdown-item v-for="(item, index) in teamData!.member" :icon="User" divided :command="item.id">
                        {{ item.name }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { Switch, Avatar, User } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { inject } from 'vue'
import axios from 'axios'

const props = defineProps({
    teamData: {
        type: Object
    },
    id: {
        type: Number
    }
})
const getData: Function | undefined = inject("getData")
const handleCommand = (item) => {
    ElMessageBox.confirm(
        '确认变更团队队长吗？将失去管理团队的权限，变更后不可恢复！',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            axios.patch(`http://localhost:3000/students/${item}`, {
                team: ""
            })
                .then(res => { })
                .catch(err => console.log(err))
            axios.patch(`http://localhost:3000/students/${props.teamData!.leader.id}`, {
                team: "Minecraft"
            })
                .then(res => { })
                .catch(err => console.log(err))
            axios.get(`http://localhost:3000/students?id=${item}`)
                .then(res => {
                    if (res.data.length !== 0) {
                        let temp = {
                            name: res.data[0].name,
                            major: res.data[0].major,
                            id: res.data[0].id
                        }
                        axios.patch(`http://localhost:3000/teams/${props.id}`, {
                            leader: temp
                        })
                            .then(res => {
                                getData!()
                                ElMessage.success("变更队长成功")
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        })
        .catch(() => {
            ElMessage.info("取消变更")
        })
}
</script>

<style lang="scss" scoped>
.changeLeader-icon {
    position: absolute;
    top: -10px;
    right: -5px;
}
</style>

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
const getTeamData: Function | undefined = inject("getData")
const cancelEdit: Function | undefined = inject("cancelEdit")
const handleCommand = (id) => {
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
            axios.get(`http://localhost:3000/teams?id=${props.id}`)
                .then(res => {
                    let rawMember = res.data[0].member
                    rawMember.map((item, index) => {
                        if (item.id === id) {
                            rawMember.splice(index, 1)
                            rawMember.push(props.teamData!.leader)
                        }
                    })
                    axios.patch(`http://localhost:3000/teams/${props.id}`, {
                        member: rawMember
                    })
                        .then(res => { })
                        .catch(err => {
                            console.error(err)
                            ElMessage.error(err)
                        })
                }).catch(err => {
                    console.error(err)
                    ElMessage.error(err)
                })
            axios.get(`http://localhost:3000/users?id=${id}`)
                .then(res => {
                    if (res.data.length !== 0) {
                        axios.patch(`http://localhost:3000/teams/${props.id}`, {
                            leader: {
                                name: res.data[0].name,
                                studentNumber: res.data[0].studentNumber,
                                major: res.data[0].major,
                                department: res.data[0].department,
                                grade: res.data[0].grade,
                                id: res.data[0].id
                            },
                        })
                            .then(res => {
                                getTeamData!()
                                ElMessage.success("变更队长成功")
                                cancelEdit!('changeCaptain')
                            })
                            .catch(err => {
                                console.error(err)
                                ElMessage.error(err)
                            })
                    }
                })
                .catch(err => {
                    console.error(err)
                    ElMessage.error(err)
                })
        })
        .catch((err) => {
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

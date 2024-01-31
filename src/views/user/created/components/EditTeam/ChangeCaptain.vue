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
                        {{ memberData?.leader.memberName }}
                    </el-dropdown-item>
                    <el-dropdown-item v-for="(item, index) in  memberData?.members" :icon="User" divided
                        :command="item.userid">
                        {{ item.memberName }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { Switch, Avatar, User } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { inject } from 'vue'
import { changeManager } from '@/api/team.js'

const props = defineProps({
    memberData: {
        type: Object
    },
    id: {
        type: Number
    }
})
const getTeamMember = inject("getTeamMember")
const cancelEdit = inject("cancelEdit")
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
            changeManager(props.id, id)
                .then(res => {
                    if (res.code === 200) {
                        getTeamMember()
                        ElMessage.success('变更队长成功')
                        cancelEdit('', 'changeCaptain')
                    }
                })
                .catch(err => {
                    console.log(err)
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

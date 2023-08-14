<template>
    <div class="add-box">
        <el-collapse v-model="activeNames" accordion @change="handleActive">
            <TeamMember :teamData="teamData" :id="id">
            </TeamMember>
            <el-collapse-item title="添加团队成员" name="1">
                <template #title>
                    <div class="collapse-title">
                        <el-icon color="#409EFF">
                            <Plus />
                        </el-icon>添加团队成员
                    </div>
                </template>
                <AddMember @searchCancel="handleSearchCancel" :teamName="teamName" :teamMember="teamMember"
                    ref="AddMemberRef" :id="id">
                </AddMember>
            </el-collapse-item>
            <TeamTeacher :teamData="teamData"></TeamTeacher>
            <el-collapse-item title="添加指导老师" name="2">
                <template #title>
                    <div class="collapse-title">
                        <el-icon color="#409EFF">
                            <Plus />
                        </el-icon>添加指导老师
                    </div>
                </template>
                <AddTeacher @searchCancel="handleSearchCancel" :teamName="teamName" :teamTeacher="teamTeacher"
                    ref="AddTeacherRef" :id="id">
                </AddTeacher>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script lang="ts" setup>
import TeamTeacher from './TeamTeacher.vue'
import TeamMember from './TeamMember.vue'
import AddTeacher from './AddTeacher.vue'
import AddMember from './AddMember.vue'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps({
    teamData: {
        type: Object
    },
    id: {
        type: Number
    },
    teamName: {
        type: String
    },
    teamMember: {
        type: Object
    },
    teamTeacher: {
        type: Object
    }
})
const AddMemberRef = ref()
const AddTeacherRef = ref()
const activeNames = ref('')
const handleActive = (val: string) => {
    AddMemberRef.value.handleChange()
    AddTeacherRef.value.handleChange()
}
const handleSearchCancel = () => {
    activeNames.value = ''
}
</script>

<style>
.el-collapse {
    border: none;
}

.el-collapse-item__header {
    border: none
}
</style>

<style lang="scss" scoped>
.collapse-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #409EFF;
    font-size: 14px;
    user-select: none;
}

.add-box {
    margin-bottom: 20px;
    margin-left: 120px;
}
</style>

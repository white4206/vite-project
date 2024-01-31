<template>
    <div class="team-member">
        <el-card shadow="hover" :body-style="{
            'padding': '15px 10px'
        }">
            <span class="team-leader-card">
                <div style="margin-right: 10px">
                    <el-avatar :size="50" src="/src/assets/head.jpg" />
                </div>
                <div>
                    <div style="padding-bottom: 5px;">
                        <span style="padding-right:10px">{{ filterMemberData.leader.memberName }}</span>
                        <el-tag class="leader-tag" type="danger">队长</el-tag>
                        <span class="small-text">{{ filterMemberData.leader.memberCollege }}</span>
                    </div>
                    <div class="small-text">{{ filterMemberData.leader.memberMajor }}</div>
                </div>
                <ChangeCaptain :memberData="filterMemberData" :id="id"></ChangeCaptain>
            </span>
        </el-card>
        <el-row class="content" :gutter="10">
            <el-col :span="8" v-for="(item, index) in filterMemberData.members" style="margin-top: 10px;">
                <el-card shadow="hover" :body-style="{
                    'padding': '10px',
                }
                    ">
                    <span class="team-member-card">
                        <div style="margin-right: 10px;">
                            <el-avatar :size="50" src="/src/assets/head.jpg" />
                        </div>
                        <div>
                            <div style="padding-bottom: 5px;">
                                <span style="padding-right: 10px;">{{ item.memberName }}</span>
                                <el-tag class="member-tag" type="success">成员</el-tag>
                            </div>
                            <!-- <div class="small-text">{{ item.membercollege }}</div> -->
                            <div class="small-text">{{ item.memberMajor }}</div>
                        </div>
                        <div class="close-icon" @click="handleDeleteMember(item.userid)">
                            <el-icon>
                                <Close />
                            </el-icon>
                        </div>
                    </span>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import ChangeCaptain from './ChangeCaptain.vue'
import { Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { computed, inject } from 'vue'
import { deleteMember } from '@/api/team.js'

const props = defineProps({
    memberData: {
        type: Object
    },
    id: {
        type: Number
    }
})
const filterMemberData = computed(() => {
    let leader
    let members = []
    props.memberData?.map(item => {
        if (item.manager === 1)
            leader = item
        else
            members.push(item)
    })
    return {
        leader,
        members
    }
})
const getTeamData = inject("getData")
const handleDeleteMember = (id) => {
    deleteMember(props.id, id)
        .then(res => {
            if (res.code === 200)
                ElMessage.success('成员变动成功')
            getTeamData()
        })
        .catch(err => {
            console.log(err)
            ElMessage.error(err)
        })
}
</script>

<style lang="scss" scoped>
.team-member {
    margin: 5px
}

.team-leader-card,
.team-member-card {
    display: flex;
    flex-direction: row;
    position: relative;
}

.small-text {
    color: #73767a;
    font-size: 12px;
}

.close-icon {
    position: absolute;
    top: -5px;
    right: -5px;
    opacity: 0.4;
}

.close-icon:hover {
    opacity: 0.8;
}

.leader-tag {
    width: 75px;
    position: absolute;
    top: -15px;
    left: -30px;
    transform: rotate(-35deg);
}

.member-tag {
    width: 80px;
    position: absolute;
    top: -10px;
    left: -35px;
    transform: rotate(-35deg);
}
</style>

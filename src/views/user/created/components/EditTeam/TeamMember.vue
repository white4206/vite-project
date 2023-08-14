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
                        <span style="padding-right:10px">{{ teamData!.leader.name }}</span>
                        <el-tag class="leader-tag" type="danger">队长</el-tag>
                    </div>
                    <div class="small-text">{{ teamData!.leader.major }}</div>
                </div>
                <ChangeCaptain :teamData="teamData" :id="id"></ChangeCaptain>
            </span>
        </el-card>
        <el-row class="content" :gutter="10" style="margin-top: 10px;">
            <el-col :span="8" v-for="(item, index) in teamData!.member">
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
                                <span style="padding-right: 10px;">{{ item.name }}</span>
                                <el-tag class="member-tag" type="success">成员</el-tag>
                            </div>
                            <div class="small-text">{{ item.major }}</div>
                        </div>
                        <div class="close-icon" @click="handleDeleteMember(item.id)">
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

<script lang="ts" setup>
import ChangeCaptain from './ChangeCaptain.vue'
import { Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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
const handleDeleteMember = (id) => {
    axios.get(`http://localhost:3000/teams?id=${props.id}`)
        .then(res => {
            let rawMember = res.data[0].member
            rawMember.map((item, index) => {
                if (item.id === id)
                    rawMember.splice(index, 1)
            });
            axios.patch(`http://localhost:3000/teams/${props.id}`, {
                member: rawMember
            })
                .then(res => {
                    getTeamData!("Delete")
                })
                .catch(err => {
                    console.error(err)
                    ElMessage.error(err)
                })
        })
        .catch(err => {
            console.error(err)
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

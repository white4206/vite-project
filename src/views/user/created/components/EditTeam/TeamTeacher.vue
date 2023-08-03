<template>
    <div class="team-teacher" v-if="JSON.stringify(teamData!.teacher) !== '{}'">
        <el-card shadow="never" :body-style="{
            'padding': '15px 10px'
        }" style="margin: 0px 0;">
            <span class=" team-teacher-card">
                <div style="margin-right: 10px">
                    <el-avatar :size="50" src="/src/assets/head.jpg" />
                </div>
                <div>
                    <div style="padding-bottom: 5px;">
                        <span style="padding-right:10px">{{ teamData!.teacher.name }}</span>
                        <span class="small-text">指导老师</span>
                        <span class="small-text">{{ teamData!.teacher.position }}</span>
                    </div>
                    <div class="small-text">{{ teamData!.teacher.department }}</div>
                </div>
            </span>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    teamData: {
        type: Object
    }
})
</script>

<style lang="scss" scoped>
.team-teacher-card {
    display: flex;
    flex-direction: row;
    position: relative;
}


.small-text {
    color: #73767a;
    font-size: 12px;
}
</style>

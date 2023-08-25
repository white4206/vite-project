<template>
    <h3>指导老师:</h3>
    <div class="team-teacher" v-if="JSON.stringify(memberData?.teacher) !== '{}'">
        <el-row class="content" :gutter="10">
            <el-col :span="12" v-for="(item, index) in memberData?.teacher" style="margin-top: 10px;">
                <el-card shadow="hover" :body-style="{
                    'padding': '15px 10px'
                }" style="margin: 0px 0;">
                    <span class=" team-teacher-card">
                        <div style="margin-right: 10px">
                            <el-avatar :size="50" src="/src/assets/head.jpg" />
                        </div>
                        <div>
                            <div style="padding-bottom: 5px;">
                                <span style="padding-right:10px">{{ item.membername }}</span>
                                <el-tag class="teacher-tag" type="">老师</el-tag>
                            </div>
                            <span class="small-text">{{ item.membercollege }}</span>
                        </div>
                    </span>
                </el-card>
            </el-col></el-row>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    memberData: {
        type: Object
    }
})
</script>

<style lang="scss" scoped>
.team-teacher {
    margin: 10px 0 0 75px;
}

.team-teacher-card {
    display: flex;
    flex-direction: row;
    position: relative;

}

.teacher-tag {
    width: 75px;
    position: absolute;
    top: -15px;
    left: -30px;
    transform: rotate(-35deg);
}

.small-text {
    color: #73767a;
    font-size: 12px;
}
</style>

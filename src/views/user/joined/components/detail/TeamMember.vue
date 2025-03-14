<template>
  <h3>团队成员:</h3>
  <div class="team-member"
       v-if="JSON.stringify(memberData?.leader) !== '{}' && JSON.stringify(memberData?.member) !== '[]'">
    <el-card shadow="hover" :body-style="{'padding': '15px 10px'}">
            <span class="team-leader-card">
                <div style="margin-right: 10px">
                    <el-avatar :size="50" src="/src/assets/head.jpg"/>
                </div>
                <div>
                    <div style="padding-bottom: 5px;">
                        <span style="padding-right:10px">{{ memberData?.leader.memberName }}</span>
                        <el-tag class="leader-tag" type="danger">队长</el-tag>
                        <span class="small-text">{{ memberData?.leader.memberCollege }}</span>
                    </div>
                    <div class="small-text">{{ memberData?.leader.memberMajor }}</div>
                </div>
            </span>
    </el-card>
    <el-row class="content" :gutter="10" style="margin-top: 10px;">
      <el-col :span="8" v-for="(item, index) in  memberData?.member" style="margin-bottom: 10px">
        <el-card shadow="hover" :body-style="{'padding': '10px',}
                    ">
                    <span class="team-member-card">
                        <div style="margin-right: 10px;">
                            <el-avatar :size="50" src="/src/assets/head.jpg"/>
                        </div>
                        <div>
                            <div style="padding-bottom: 5px;">
                                <span style="padding-right: 10px;">{{ item.memberName }}</span>
                                <el-tag class="member-tag" type="success">成员</el-tag>
                            </div>
                            <div class="small-text">{{ item.memberMajor }}</div>
                        </div>
                    </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

const props = defineProps({
  memberData: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.team-member {
  margin-top: 20px;
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

<template>
    <el-card class="box-card" shadow="hover" >
        <template #header>
            <div class="card-header">
                <span class="card-header-title">
                    <span><img :src="data?.logoUrl ? data?.logoUrl : 'src/assets/team.png'" :alt="data?.groupName"
                            width="25"></span>
                    {{ data?.groupName }}
                </span>
                <span>
                    <el-button type="primary" plain @click="handleOpen">详情</el-button>
                </span>
            </div>
        </template>
        <div class="item">
            <el-tag size="large" round hit @click="viewMatchDetail" class="tag-button">
                <div style="display: flex;align-items: center;">
                    查看参赛信息
                    <el-icon>
                        <ArrowRightBold />
                    </el-icon>
                </div>
            </el-tag>
        </div>
        <div class="item">
            <el-tag size="large" round hit @click="viewAwardRecord" class="tag-button" type="warning">
                <div style="display: flex;align-items: center;">
                    查看获奖记录
                    <el-icon>
                        <ArrowRightBold />
                    </el-icon>
                </div>
            </el-tag>
        </div>
    </el-card>
    <MatchDetails v-model="isViewMatch" :id="id"></MatchDetails>
    <AwardRecord v-model="isViewAward" :id="id"></AwardRecord>
    <Detail v-model="isOpen" :id="id"></Detail>
</template>
<script  setup>
import MatchDetails from './MatchDetails.vue'
import AwardRecord from './AwardRecord.vue'
import { ArrowRightBold } from '@element-plus/icons-vue'
import Detail from './Detail/Detail.vue';
import { ref } from 'vue'

const props = defineProps({
    data: {
        type: Object
    },
    id: {
        type: Number
    }
})
const isOpen = ref(false)
const handleOpen = () => {
    isOpen.value = true
}

const isViewMatch = ref(false)
const viewMatchDetail = () => {
    isViewMatch.value = true
}

const isViewAward = ref(false)
const viewAwardRecord = () => {
    isViewAward.value = true
}
</script>
<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header-title {
    display: flex;
    align-items: center;

    span {
        padding-right: 5px;
    }
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 350px;
    height: 230px;
    margin: 10px 20px;
}

.tag-button {
    transition: .4s;
}

.tag-button:hover {
    cursor: pointer;
    transform: translate(10px);
    background-color: #ffffff;
    transition: .4s;
}
</style>
  
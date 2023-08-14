<template>
    <div class="competition-card">
        <div class="competition-info">
            <div class="competition-img">
                <img src="/src/assets/notFound.jpg" alt="">
            </div>
            <div class="competition-title-box">
                <div class="competition-title">
                    <!-- <el-tooltip effect="dark" :content="data.name" placement="top-start"> -->
                    <span class="title-box">{{ data?.name }}</span>
                    <!-- </el-tooltip> -->
                    <el-tag type="" effect="plain">
                        {{ "报名中" }}
                    </el-tag>
                </div>
                <div>
                    <div class="date-box">
                        <el-icon>
                            <Clock />
                        </el-icon>
                        <span>{{ formattedStartDate }}-{{ formattedFinishDate }}</span>
                    </div>
                    <div class="date-box">
                        <el-icon>
                            <More />
                        </el-icon>
                        <span>{{ data?.desc }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="competition-icon">
            <el-icon color="#909399">
                <ArrowRightBold />
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup >
import { ArrowRightBold, Clock, More } from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = defineProps({
    data: {
        type: Object
    }
})
const formattedStartDate = computed(() => {
    return props.data?.startDate.split('-').join('.')
})
const formattedFinishDate = computed(() => {
    return props.data?.finishDate.split('-').join('.')
})
</script>
<style lang="scss" scoped>
.competition-card {
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.competition-info {
    display: flex;
    flex-direction: row;
}

.competition-img {
    width: 200px;
    height: 120px;
    padding-right: 30px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
    }
}

.competition-title-box {
    width: 600px
}

.competition-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    margin: 15px 0 30px 0;
    color: #303133;

    .title-box {
        font-weight: bold;
        padding-right: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

}

.date-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    color: #909399;
    margin-bottom: 5px;

    span {
        padding-left: 5px;
    }
}

.competition-icon {
    padding-right: 75px;
}
</style>

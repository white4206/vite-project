<template>
    <div class="competition-card">
        <el-row align="middle">
            <el-col :span="12">
                <div class="competition-info">
                    <div class="competition-img">
                        <img :src="data?.headimage ? data?.headimage : '/src/assets/notFound.jpg'" alt="">

                    </div>
                    <div class="competition-title-box">
                        <div class="competition-title">
                            <span class="title-box">{{ data?.matchname }}</span>
                            <el-tag :type="state?.type">
                                {{ state?.text }}
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
                                    <User />
                                </el-icon>
                                <span>{{ data?.signnum + ' / ' + data?.maxcount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="11" style="padding:0 10px;">
                <div v-if="data?.maxstep > 1 && data?.matchstate !== 1" class="step-box">
                    <div class="content-text">
                        <el-steps :space="200" :active="data?.presentstep" align-center>
                            <template v-for="(item, index) in data?.maxstep">
                                <el-step :title="'阶段' + item" :icon="item?.icon" @click.stop="handleStep(index + 1)"
                                    class="step-item" />
                            </template>
                        </el-steps>
                    </div>
                </div>
            </el-col>
            <el-col :span="1">
                <div class="competition-icon">
                    <el-icon color="#909399">
                        <ArrowRightBold />
                    </el-icon>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ArrowRightBold, Clock, User } from '@element-plus/icons-vue'
import { computed, h } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { positionStep } from '@/api/competitions';
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    data: {
        type: Object
    }
})
const formattedStartDate = computed(() => {
    return props.data?.starttime.split('-').join('.')
})
const formattedFinishDate = computed(() => {
    return props.data?.deadline.split('-').join('.')
})
const state = computed(() => {
    if (props.data?.matchstate === -1)
        return { type: 'warning', text: '未开始' }
    else if (props.data?.matchstate === 0)
        return { type: '', text: '正在进行' }
    else if (props.data?.matchstate === 1)
        return { type: 'danger', text: '已结束' }
})
const handleStep = (stepNum) => {
    if (props.data?.presentstep < stepNum)
        ElNotification({
            title: '提示',
            type: 'warning',
            message: h('div', { style: 'color: teal' }, '流程尚未开始'),
            zIndex: 9999
        })
    else
        positionStep({
            matchid: props.data?.id,
            stepnum: stepNum
        })
            .then(res => {
                router.push(`/competition/competitions/details/${res.data.data.id}&${res.data.data.matchstate}`)
            })
            .catch(err => {
                console.log(err)
                ElMessage.error(err)
            })
}
</script>
<style lang="scss" scoped>
.competition-card {
    background-color: #FFFFFF;
}

.competition-info {
    display: flex;
    flex-direction: row;
    transition: .4s;
}

.competition-info:hover {
    transform: translate(-10px);
    transition: .4s;
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
    width: 300px
}

.competition-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    margin: 15px 0 30px 0;
    color: #303133;

    .title-box {
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
    font-size: 14px;
    color: #909399;
    margin-bottom: 5px;

    span {
        padding-left: 5px;
    }
}

.competition-icon {
    padding-right: 75px;
    transition: .4s;
}

.competition-icon:hover {
    transform: translate(-10px);
    transition: .4s;
}

.step-box {
    background-color: #F2F6FC;
    border-radius: 15px;
    padding: 20px 10px;
    cursor: default;
}

.step-item {
    cursor: pointer;
}
</style>

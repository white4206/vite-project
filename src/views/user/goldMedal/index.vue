<template>
    <div class="awardRecord-box" v-loading="loading">
        <div class="select-box">
            <el-row justify="start" :gutter="20">
                <el-col :span="6">
                    <el-input :prefix-icon="Search" v-model="searchedValue" placeholder="搜索比赛名称" />
                </el-col>
                <el-col :span="5">
                    <el-select :prefix-icon="Filter" v-model="selectedValue" placeholder="筛选选项">
                        <el-option v-for="item in options" :key="item.option" :label="item.option" :value="item.option">
                            <div class="optionItem">
                                <el-icon>
                                </el-icon>
                                <span>{{ item.option }}</span>
                            </div>
                        </el-option>
                        <template #prefix>
                            <el-icon>
                                <Filter />
                            </el-icon>
                        </template>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="selectedDate" placeholder="搜索比赛日期" />
                </el-col>
            </el-row>
        </div>
        <div class="content-box">
            <el-timeline>
                <el-timeline-item v-for="(item, index) in filterRecordData" :key="item" :icon="item.icon" :type="item.type"
                    :color="item.color" :size="item.size" :hollow="item.hollow" :timestamp="item.timestamp">
                    {{ item.content }}
                    <el-tag v-if="item.status === '正在进行'">进行中</el-tag>
                    <el-tag v-if="item.status === 'other'" type="warning">其他</el-tag>
                    <el-tag v-if="item.status === '获奖比赛'" type="danger">{{ item.level }}</el-tag>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { MoreFilled, Search, Calendar, Filter } from '@element-plus/icons-vue'

const recordData = [
    {
        content: '第十届中国可视化与可视分析大会“仙林杯”决赛',
        timestamp: '2023-07-04 20:46',
        size: 'large',
        type: 'primary',
        status: "正在进行",
        icon: MoreFilled,
    },
    {
        content: '国信安网页设计大赛决赛',
        timestamp: '2023-07-06 20:46',
        status: "获奖比赛",
        level: "一等奖",
        color: '#0bbd87',
    },
    {
        content: '第一届“发现杯”创新创意服务大赛',
        timestamp: '2023-07-12 20:46',
        status: "finished",
        type: 'primary',
        hollow: true,
    },
    {
        content: '...',
        timestamp: '2018-04-03 20:46',
        status: "other",
        other: true,
        size: 'large',
    },
]
const selectedValue = ref("全部比赛")
const searchedValue = ref()
const selectedDate = ref()
const options = [{ option: "全部比赛" }, { option: "正在进行" }, { option: "获奖比赛" }]
const filterRecordData = computed(() => {
    return recordData.filter(
        (item, index) => {
            if (selectedValue.value === "全部比赛")
                return true
            else if (selectedValue.value === "正在进行")
                return item.status === "正在进行"
            else if (selectedValue.value === "获奖比赛")
                return item.status === "获奖比赛"
        }
    )
})
const loading = ref(true)
onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
})
</script>

<style lang="scss" scoped>
.awardRecord-box {
    border-radius: 15px;
    background-color: #ffffff;
    min-height: 100%
}

.select-box {
    padding: 20px;
}

.content-box {
    padding: 20px;
}

.optionItem {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>

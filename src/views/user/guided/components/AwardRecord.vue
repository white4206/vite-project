<template>
    <el-dialog title="none" width="80%" :show-close="true" :close-on-click-modal="false" :destroy-on-close="true"
         :close-on-press-escape="false" style="border-radius: 15px;">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h4 :id="titleId" :class="titleClass">获奖记录</h4>
            </div>
        </template>
        <div class="dialog-content">
            <div class="select-box">
                <el-row justify="start" :gutter="20">
                    <el-col :span="6">
                        <el-input :prefix-icon="Search" v-model="searchedValue" placeholder="搜索比赛名称" />
                    </el-col>
                    <el-col :span="5">
                        <el-select :prefix-icon="Filter" v-model="selectedValue" placeholder="筛选选项">
                            <el-option v-for="item in options" :key="item.option" :label="item.option" :value="item.option">
                                <div class="optionItem">
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
                    <el-col :span="5">
                        <el-date-picker v-model="selectedDate" placeholder="搜索比赛日期" value-format="YYYY-MM-DD" />
                    </el-col>
                </el-row>
            </div>
            <div class="content-box">
                <el-timeline>
                    <el-timeline-item v-for="(item, index) in filterTableData" :key="item"
                        :type="timeLineType(item.prizeLevel)" :hollow="true" :timestamp="item.winPrizeTime">
                        {{ item.matchName }}
                        <el-tag v-if="item.prizeName" :type="prizeType(item.prizeLevel)">{{ item.prizeName
                        }}</el-tag>
                    </el-timeline-item>
                </el-timeline>
            </div>

        </div>
        <template #footer>
            <div class="dialog-footer">

            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Filter } from '@element-plus/icons-vue'
import { teamAwards } from '@/api/award.js'

const props = defineProps({
    id: {
        type: Number
    }
})

const getData = () => {
    teamAwards(props.id)
        .then(res => {
            if (res.code === 200) {
                recordData.value = res.data
                recordData.value = recordData.value.map(item => {
                    item.winPrizeTime = item.winPrizeTime.split('T')[0]
                    return item
                })
                recordData.value.push({
                    matchName: `${JSON.stringify(res.data) === '[]' ? '暂无获奖记录...' : '...'}`,
                    prizeLevel: '',
                    prizeName: '',
                    winPrizeTime: ''
                })
            }
        })
        .catch(err => console.log(err))
}
onMounted(() => {
    getData()
})
const recordData = ref([])

const timeLineType = (level) => {
    if (level === 1)
        return 'danger'
    else if (level === 2)
        return 'warning'
    else if (level === 3)
        return 'primary'
    else if (level > 3)
        return 'success'
    else
        return ''
}
const prizeType = (level) => {
    if (level === 1)
        return 'danger'
    else if (level === 2)
        return 'warning'
    else if (level === 3)
        return ''
    else if (level > 3)
        return 'success'
    else
        return ''
}

const selectedValue = ref("全部比赛")
const searchedValue = ref('')
const filterMatchNameData = computed(() =>
    recordData.value?.filter(
        (data) =>
            !searchedValue.value ||
            data.matchName.toLowerCase().includes(searchedValue.value.toLowerCase())
    )
)
const options = [{ option: "全部比赛" }, { option: "一等奖" }, { option: "二等奖" }, { option: "三等奖" }, { option: "其他奖项" }]
const filterRecordData = computed(() => {
    return filterMatchNameData.value?.filter(
        item => {
            if (selectedValue.value === "全部比赛")
                return true
            else if (selectedValue.value === "一等奖")
                return item.prizeLevel === 1
            else if (selectedValue.value === "二等奖")
                return item.prizeLevel === 2
            else if (selectedValue.value === "三等奖")
                return item.prizeLevel === 3
            else if (selectedValue.value === "其他奖项")
                return item.prizeLevel > 3
        }
    )
})
const selectedDate = ref()
const filterTableData = computed(() => {
    return filterRecordData.value?.filter(
        item => !selectedDate.value || selectedDate.value === item.winPrizeTime
    )
})
</script>

<style lang="scss" scoped>
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

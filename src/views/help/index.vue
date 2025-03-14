<template>
  <el-main>
    <el-card class="help-box" shadow="never">
      <el-row justify="center">
        <el-col :span="5">
          <el-card v-loading="menuLoading" class="help-content-card" shadow="never">
            <el-menu class="menu" :default-active="activeIndex" @select="handleSelect">
              <el-menu-item :index="item.dictValue" v-for="item in questionTypeList">
                <div class="menu-item-box">
                  <span>{{ item.dictLabel }}</span>
                  <el-icon class="caretRight">
                    <CaretRight/>
                  </el-icon>
                </div>
              </el-menu-item>
            </el-menu>
          </el-card>
        </el-col>
        <el-col :span="19">
          <el-card v-loading="contentLoading" class="help-content-card" shadow="never">
            <div class="help-content">
              <AnswerPage :isExpandList="isExpandList" @custom-open="handleCustomOpen"
                          @custom-refresh="handleCustomRefresh"
                          :data="answerData"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </el-main>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {CaretRight} from "@element-plus/icons-vue";
import {getAnswerByType, getQuestionType} from "@/api/help.js";
import AnswerPage from "@/views/help/components/AnswerPage.vue";

const contentLoading = ref(true)
const menuLoading = ref(true)
const activeIndex = ref()
const questionTypeList = ref([])
const answerData = ref([])
const isExpandList = ref([])

const handleSelect = (index) => {
  isExpandList.value = []
  activeIndex.value = index
  contentLoading.value = true
  getAnswerByType(index).then(res => {
    if (JSON.stringify(res.data) !== '[]') {
      answerData.value = res.data.map(item => {
        return {
          ...item,
          reply: item.reply ? item.reply : "暂无回答"
        }
      })
    } else {
      answerData.value = []
    }
    res.data.forEach((item, index) => {
      if (index === 0)
        isExpandList.value.push(true)
      else
        isExpandList.value.push(false)
    })
    contentLoading.value = false
  })
}
const handleCustomRefresh = () => {
  handleSelect(activeIndex.value)
}
const handleCustomOpen = () => {
  activeIndex.value = '0'
  handleSelect(activeIndex.value)
}
onMounted(() => {
  getQuestionType().then(res => {
    questionTypeList.value = res.data
    activeIndex.value = res.data[0].dictValue
    handleSelect(activeIndex.value)
    menuLoading.value = false
  })
})
</script>
<style lang="scss" scoped>
.help-content-card {
  border: none;
  height: 100%;
}

.help-box {
  border-radius: 15px;
}

.help-box:deep(.el-card__body) {
  padding: 0;
}

.help-content-card:deep(.el-card__body) {
  padding: 0;
  height: 100%;
}

.menu {
  margin-top: 10px;
  margin-left: 10px;
  height: 600px;
  min-height: 100%;
  border-right: 1px solid #e4e7ed;
}

.menu-item-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
}

.caretRight {
  display: none;
  color: #409EFF;
}

.el-menu-vertical-bar:not(.el-menu--collapse) {
  padding: 10px;
  width: 200px;
  border-radius: 5px;
}

.el-menu-item {
  border-radius: 0;
  border-color: #409EFF;
}

.el-menu-item.is-active {
  border-left: 5px solid #409EFF;
  border-radius: 0;
}

.el-menu-item.is-active .caretRight {
  display: block;
  color: #409EFF;
}

.help-content {
  min-height: 600px;
  padding: 20px;
}
</style>

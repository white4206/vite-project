<template>
  <div>
    <div class="help-btn">
      <span>我要提问</span>
      <el-button type="primary" :icon="ChatLineSquare" circle @click="handleClick"/>
    </div>
    <el-dialog v-model="openQuestionDialog" title="提问对话框" :show-close="true"
               :close-on-click-modal="false" @close="reset"
               style="border-radius: 15px;" width="45%">
      <div class="dialog-content">
        <el-form :model="questionForm" ref="questionFormRef" label-position="top" :rules="questionRules">
          <el-form-item label="请描述您的问题" prop="question">
            <el-input type="textarea" rows="5" resize="none" maxlength="150" show-word-limit
                      v-model="questionForm.question"/>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="reset">取消</el-button>
          <el-button @click="submit" type="primary">确认</el-button>
        </div>
      </template>
    </el-dialog>
    <template v-if="JSON.stringify(data)!=='[]'">
      <div class="help-box" v-for="(item,index) in data">
        <div class="title" @click="handleExpand(index)">
          <!--        <RouterLink :to="'#'+item" @click.stop="1">-->
          <span class="link"> <el-icon color="#303133"><CaretRight/></el-icon> </span>
          <!--        </RouterLink>-->
          <div class="title-text">
            {{ item.question }}
          </div>
        </div>
        <div :class="{content:true,isExpand:isExpandList[index]}" :id="item">
          {{ '答: ' + item.reply }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="helpContentCard-box-empty">
        <el-empty description="暂无问题"></el-empty>
      </div>
    </template>
  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import {CaretRight, ChatLineSquare} from "@element-plus/icons-vue";
import {askQuestion} from "@/api/help.js";
import {ElMessage} from "element-plus";

const emits = defineEmits(["custom-open", "custom-refresh"])
const props = defineProps({
  data: {
    type: Object
  },
  isExpandList: {
    type: Array
  }
})
const questionForm = ref({
  question: null
})
const questionFormRef = ref()
const questionRules = ref({
  question: [{required: true, message: "请输入您的问题", trigger: "blur"}]
})
const openQuestionDialog = ref(false)

const handleExpand = (index) => {
  props.isExpandList[index] = !props.isExpandList[index]
}
const handleClick = () => {
  emits("custom-open")
  openQuestionDialog.value = true
}
const reset = () => {
  questionFormRef.value.resetFields()
  openQuestionDialog.value = false
}
const submit = () => {
  questionFormRef.value.validate(valid => {
    if (valid) {
      askQuestion(questionForm.value).then(res => {
        if (res.code === 200) {
          ElMessage.success("已发送问题")
        }
        emits("custom-refresh")
        openQuestionDialog.value = false
      })
    }
  })
}
onMounted(() => {
  if (JSON.stringify(props.data) === '[]')
    props.isExpandList.push(true)
  else
    props.data.forEach((item, index) => {
      if (index === 0)
        props.isExpandList.push(true)
      else
        props.isExpandList.push(false)
    })
})
</script>
<style scoped lang="scss">
.helpContentCard-box-empty {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 600px
}

.help-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 14px;
  color: #909399;

  span {
    margin-right: 10px;
  }
}

.help-box {
  margin-bottom: 20px;
  height: 100%;
}

.title {
  position: relative;
  display: flex;
  width: 85%;
}

.title:hover .title-text {
  color: #409EFF;
}

.title-text {
  font-size: 18px;
  font-weight: bold;
  color: #337ecc;
  margin-bottom: 10px;
  cursor: pointer;
}

.link {
  display: none;
  position: absolute;
  left: -20px;
  font-size: 20px;
}

.title:hover .link {
  display: inline;
}

.content {
  height: 0;
  border: 0 solid #d9ecff;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  background-color: #ecf5ff;
  transition: .4s;
}

.isExpand {
  height: auto;
  padding: 20px;
  border: 2px solid #d9ecff;
  transition: .4s;
}
</style>
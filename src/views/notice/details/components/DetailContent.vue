<template>
  <div class="main">
    <div class="top-box">
      <el-row justify="center">
        <el-col :span="18">
          <div class="text-title-box">
            <h1>{{ data?.info.infoTitle }}</h1>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-card class="text-content-box" shadow="never">
      <div>
        <div class="content-title">
          <span class="title-icon">
            <el-icon color="#337ecc">
              <CollectionTag/>
            </el-icon>
          </span>
          <h4>公告内容</h4>
        </div>
        <div class="content-text" ref="content">

        </div>
        <div class="content-title" v-if="true">
          <span class="title-icon">
            <el-icon color="#337ecc">
              <Folder/>
            </el-icon>
          </span>
          <h4>附件列表</h4>
        </div>
        <div class="content-attachments">
          <div v-for="item in data.files">
            <el-link :icon="Link" :underline="true" :href="'http://140.143.139.167' + item.fileUrl"
                     target="_blank">{{ item.fileName }}</el-link>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {CollectionTag, Link, Folder} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";

const content = ref()
const props = defineProps({
  data: {
    type: Object
  }
})

onMounted(() => {
  content.value.innerHTML = props.data.info.infoContent
})
</script>

<style lang="scss" scoped>
.top-box {
  margin: 0 20px;
}

.text-title-box {
  text-align: center;
  color: #303133;
  margin: 50px 0 20px 0;
}

.text-content-box {
  border-radius: 15px;
  padding: 20px;
}

.date-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: #606266;
  margin-bottom: 50px;

  span {
    padding-left: 5px;

  }
}

.signUp-box {
  margin-bottom: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.view-progress {
  width: 45%;
  background-color: white;
  padding-top: 20px;
  margin: 0 20px;
  border-radius: 20px;
}

.content-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf5ff;
  padding: 5px;
  border-radius: 50%;
  margin-right: 4px;
}

.content-text {
  padding: 20px 30px;
}

.content-attachments {
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
}
</style>

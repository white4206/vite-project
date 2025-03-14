<template>
  <div class="main">
    <div class="top-box">
      <el-row justify="start">
        <el-col :span="18">
          <div class="text-title-box">
            <h1>{{ data.match.matchName }}</h1>
          </div>
          <div class="date-box">
            <el-icon>
              <Clock/>
            </el-icon>
            <span>{{ formattedStartDate }}-{{ formattedFinishDate }}</span>
          </div>
          <div class="signUp-box" v-if="store.GET_ROLE() === '1' && route.params.Cid.split('&')[1] === '1'">
            <el-button type="primary" @click="handleSignUp" size="large">申请报名</el-button>
          </div>
          <div class="signUp-box" v-if="store.GET_ROLE() === '1' && route.params.Cid.split('&')[1] === '0'">
            <el-button type="primary" @click="handleSignUp" size="large" plain loading>活动未开始</el-button>
          </div>
          <div class="signUp-box" v-if="store.GET_ROLE() === '1' && route.params.Cid.split('&')[1] === '-1'">
            <el-button type="danger" @click="handleSignUp" size="large" plain disabled>活动已结束</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <img :src="headImage" alt=""
               style="width: 100%;height: 200px;margin-bottom: 35px;">
        </el-col>
      </el-row>
    </div>

    <el-card class="text-content-box" shadow="never">
      <div>
        <div>
          <div class="content-title">
            <span class="title-icon">
              <el-icon color="#337ecc">
                <CollectionTag/>
              </el-icon>
            </span>
            <span>
              <h4>活动内容</h4>
            </span>
          </div>
          <div class="content-text" ref="content">

          </div>
        </div>
        <div class="content-title" v-if="JSON.stringify(data.matchFiles) !== '[]'">
          <span class="title-icon">
            <el-icon color="#337ecc">
              <Folder/>
            </el-icon>
          </span>
          <span>
            <h4>附件列表</h4>
          </span>
        </div>
        <div class="content-attachments">
          <div v-for="item in data.matchfiles">
            <el-link :icon="Link" :underline="true" :href="'http://140.143.139.167' + item.matchFile"
                     target="_blank">{{ item.matchFileName }}
            </el-link>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="text-content-box" shadow="never" v-if="data.match.maxLevel !== 0">
      <div v-if="data.match.maxLevel !== 0">
        <div class="content-title">
          <span class="title-icon">
            <el-icon color="#337ecc">
              <Trophy/>
            </el-icon>
          </span>
          <span>
            <h4>获奖名单</h4>
          </span>
        </div>
        <div class="content-text">
          {{ data.match.content }}
        </div>
      </div>
    </el-card>
    <SignUpDialog v-model="signUp" :id="data.match.id"></SignUpDialog>
  </div>
</template>

<script setup>
import {Clock, CollectionTag, Link, Folder, Trophy} from '@element-plus/icons-vue'
import SignUpDialog from './SignUpDialog.vue'
import {computed, onMounted, ref} from 'vue'
import useLoginStore from '@/store/loginStore';
import {useRoute} from 'vue-router'

const content = ref()
const headImage = ref()
const route = useRoute()
const store = useLoginStore()
const signUp = ref(false)
const props = defineProps({
  data: {
    type: Object
  }
})
const formattedStartDate = computed(() => {
  return props.data.match.startTime.split('T')[0].split('-').join('.')
})
const formattedFinishDate = computed(() => {
  return props.data.match.deadline.split('T')[0].split('-').join('.')
})
const handleSignUp = () => {
  signUp.value = true
}
onMounted(() => {
  content.value.innerHTML = props.data.match.content
  headImage.value = import.meta.env.VITE_BASE_URL + props.data.match.headImage
})

</script>

<style lang="scss" scoped>
.top-box {
  margin: 0 20px;
}

.text-title-box {
  color: #303133;
  margin: 50px 0 20px 0;
}

.text-content-box {
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 50px;
}

.date-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: #606266;
  margin-bottom: 40px;

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

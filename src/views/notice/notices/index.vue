<template>
  <el-main>
    <el-row justify="center" class="content">
      <el-col :span="18">
        <ImgCardSkeleton :loading="loading">
          <el-row :gutter="25">
            <el-col :span="6" v-for="(item, index) in specialNotices" :key="item.id"
                    @click="handleClick(item.id)">
              <div class="grid-content" v-if="index < 4">
                <ImgCard :data="item"></ImgCard>
              </div>
            </el-col>
          </el-row>
        </ImgCardSkeleton>
      </el-col>
    </el-row>
  </el-main>
  <div style="background-color: #FFFFFF;">
    <el-row justify="center" style="max-width: 1500px;margin: 0 auto;padding: 20px;min-height: 500px">
      <el-col :span="18">
        <el-card shadow="never">
          <template #header>
            <div style="display: flex;align-items: center;">
              <span style="font-weight: bold;font-size: 18px;color:#337ecc ;">公告列表</span>
              <el-icon color="#c8c9cc">
                <BottomRight/>
              </el-icon>
            </div>
          </template>
          <NoticeContent/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ImgCard from './components/ImgCard.vue'
import NoticeContent from './components/NoticeContent.vue';
import ImgCardSkeleton from './components/ImgCardSkeleton.vue';
import {BottomRight} from "@element-plus/icons-vue";
import {useRouter} from 'vue-router'
import {ref, onMounted, inject} from 'vue'
import {getNotices} from '@/api/notices.js'

const noticeContentRef = ref()
const router = useRouter()
const loading = ref(true)
const specialNotices = ref([])

onMounted(() => {
  getNotices(1)
      .then(res => {
        if (res.code === 200) {
          specialNotices.value = res.data
          specialNotices.value = specialNotices.value.map(item => {
            item.createTime = item.createTime.split(' ')[0]
            return item
          })
          loading.value = false
        }
      })
      .catch(err => console.error(err))
})
const handleClick = (id) => {
  router.push(`/notice/details/${id}`)
}
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 20px;
}

.el-card {
  border: none;
}

:deep(.el-card__header) {
  padding: 10px;
}

:deep(.el-card__body) {
  padding: 0;
  padding-top: 10px;
}
</style>

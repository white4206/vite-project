<template>
  <el-row justify="center">
    <el-col :span="18">
      <div class="grid-content pageHeader">
        <PageHeader :data="noticeData"></PageHeader>
      </div>
    </el-col>
  </el-row>
  <el-row justify="center">
    <el-col :span="18">
      <div class="grid-content">
        <ContentSkeleton :loading="loading">
          <DetailContent :data="noticeData"></DetailContent>
        </ContentSkeleton>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import ContentSkeleton from './components/ContentSkeleton.vue';
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import PageHeader from './components/PageHeader.vue';
import DetailContent from './components/DetailContent.vue';
import {getDetails} from '@/api/notices.js'

const route = useRoute()
const loading = ref(true)
const noticeData = ref()
const getData = () => {
  getDetails(route.params.Nid)
      .then(res => {
        if (res.code === 200) {
          noticeData.value = res.data
          loading.value = false
        }
      })
      .catch(err => console.log(err))
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.pageHeader {
  margin-top: 20px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

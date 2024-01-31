<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-bar">
          <el-menu-item index="index" @click="handleSelect">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="1" @click="handleSelect">
            <span>赛事动态</span>
          </el-menu-item>
          <el-menu-item index="2" @click="handleSelect">
            <span>通知文件</span>
          </el-menu-item>
          <el-menu-item index="3" @click="handleSelect">
            <span>赛事回顾</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <NoticeContentSkeleton :loading="loading">
          <div class="table-box">
            <el-table :data="filterNoticeList" :show-overflow-tooltip="true"
                      @row-click="handleClick($event)" :default-sort="{ prop: 'date', order: 'ascending' }" stripe
                      empty-text="未查询到相关公告信息">
              <el-table-column prop="infoTitle" label="公告名称"/>
              <el-table-column prop="createTime" sortable label="日期" align="center" width="95">
                <template #default="scope">
                  <div class="date-text">
                    {{ scope.row.createTime }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </NoticeContentSkeleton>
      </el-col>
    </el-row>
    <el-row justify="center" :gutter="20" class="content">
      <el-col :span="24">
        <el-card class="pagination-card" shadow="never">
          <el-pagination layout="prev, pager, next" :pager-count="9" :default-page-size="10" :total="totalCount"
                         v-model:current-page="currentPage" @update:current-page="handlePageChange"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import NoticeContentSkeleton from './NoticeContentSkeleton.vue';
import {ref, onMounted, computed} from 'vue'
import {getNotices, getNoticesByType} from '@/api/notices.js'
import {useRouter} from 'vue-router'

const totalCount = ref(1)
const noticeList = ref([])
const loading = ref(true)
const infoType = ref("index")
const defaultActive = ref("index")

const handleSelect = (e) => {
  infoType.value = e.index
  getData()
}
const getData = (page = 1) => {
  if (infoType.value === "index") {
    getNotices(page)
        .then(res => {
          if (res.code === 200) {
            noticeList.value = res.data
            noticeList.value = noticeList.value.map(item => {
              item.createTime = item.createTime.split(' ')[0]
              return item
            })
            loading.value = false
            totalCount.value = Number(res.msg.split(":")[1])
          }
        })
        .catch(err => console.error(err))
  } else {
    getNoticesByType(page, infoType.value).then(res => {
      noticeList.value = res.data
      noticeList.value = noticeList.value.map(item => {
        item.createTime = item.createTime.split(' ')[0]
        return item
      })
      loading.value = false
      totalCount.value = Number(res.msg.split(":")[1])
    })
  }
}
onMounted(() => {
  getData()
})
const search = ref('')
const filterNoticeList = computed(() => {
      return noticeList.value.filter(
          (data) =>
              !search.value ||
              data.infoTitle.toLowerCase().includes(search.value.toLowerCase())
      )
    }
)
const router = useRouter()
const handleClick = (evt) => {
  router.push(`/notice/details/${evt.id}`)
}
const currentPage = ref()
const handlePageChange = () => {
  document.documentElement.scrollTop = 0
  loading.value = true
  getData(currentPage.value)
}

</script>

<style lang="scss" scoped>
::v-deep .el-table__row {
  cursor: pointer;
}

.el-menu {
  padding: 10px;
  border-radius: 15px 15px;
  border: none;
}

.el-menu-item {
  justify-content: center;
  margin: 10px 0;
  border-radius: 15px;
  height: 40px;
}

.el-menu-item.is-active {
  border-radius: 15px;
  background-color: #409EFF;
  color: #FFFFFF
}

.date-text {
  font-size: 12px;
  color: #909399;
}

.table-box {
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 15px;
}

.card-title {
  padding-left: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.pagination-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 15px;
  margin-top: 20px;
}

.el-card {
  border: none;
}
</style>

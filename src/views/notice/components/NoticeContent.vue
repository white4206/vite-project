<template>
    <NoticeContentSkeleton :loading="loading">
        <div class="demo-collapse">
            <el-collapse v-model="activeNames" @change="handleChange">
                <template v-for="(item, index) in noticeList" :key="item.id">
                    <el-collapse-item v-if="!item.special" :name="index + ''">
                        <template #title>
                            <div class="card-title">{{ item.title }}</div>
                        </template>
                        <div>
                            {{ item.content }}
                        </div>
                    </el-collapse-item>
                </template>
            </el-collapse>
        </div>
    </NoticeContentSkeleton>
</template>
  
<script lang="ts" setup>
import NoticeContentSkeleton from './NoticeContentSkeleton.vue';
import { ref, onMounted } from 'vue'
// import useNoticeStore from '../../../store/noticeStore';
// const store = useNoticeStore()
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const noticeList = ref<{
    title: string
    author: string
    content: string
    id: number
    [propsName: string]: any
}[]>([])
const activeNames = ref<string | string[]>('')
const handleChange = (val: string[]) => {
}
const route = useRoute()
const loading = ref<boolean>(true)
onMounted(() => {
    setTimeout(() => {
        axios.get("http://localhost:3000/notice")
            .then(res => {
                noticeList.value = res.data
                loading.value = false
            })
            .catch(err => {
                console.error(err)
                ElMessage.error(err)
            })
        activeNames.value = route.params.Nid
    }, 2000)
    // store.getNoticeList()
})

</script>

<style lang="scss" scoped>
.card-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>

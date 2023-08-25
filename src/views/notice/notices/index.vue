<template>
    <el-row justify="center" class="content">
        <el-col :span="18">
            <div class="grid-content">
                <h1>最新快讯</h1>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center" class="content">
        <el-col :span="18">
            <ImgCardSkeleton :loading="loading">
                <el-row :gutter="25">
                    <el-col :span="6" v-for="(item, index) in specialNotices" :key="item.id" @click="handleClick(item.id)">
                        <div class="grid-content" v-if="index < 4">
                            <ImgCard :data="item"></ImgCard>
                        </div>
                    </el-col>
                </el-row>
            </ImgCardSkeleton>
        </el-col>
    </el-row>
    <el-row justify="center" class="content">
        <el-col :span="18">
            <div class="grid-content">
                <h1>公告列表</h1>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center" :gutter="20" class="content">
        <el-col :span="18">
            <div class="grid-content">
                <NoticeContent></NoticeContent>
            </div>
        </el-col>
    </el-row>
</template>
    
<script setup>
import ImgCard from './components/ImgCard.vue'
import NoticeContent from './components/NoticeContent.vue';
import ImgCardSkeleton from './components/ImgCardSkeleton.vue';
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getNotices } from '@/api/notices.js'

const router = useRouter()
const loading = ref(true)
const specialNotices = ref([])
onMounted(() => {
    getNotices(1)
        .then(res => {
            if (res.data.code === 200) {
                specialNotices.value = res.data.data
                specialNotices.value = specialNotices.value.map(item => {
                    item.createtime = item.createtime.split(' ')[0]
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

.grid-content {
    h1 {
        color: #95c7f4;
    }
}
</style>

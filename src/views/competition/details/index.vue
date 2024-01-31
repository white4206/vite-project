<template>
    <el-row justify="center">
        <el-col :span="store.GET_ROLE() === '2' ? 24 : 18">
            <div class="grid-content">
                <PageHeader :data="competitionData"></PageHeader>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="store.GET_ROLE() === '2' ? 24 : 18">
            <div class="grid-content">
                <ContentSkeleton :loading="loading">
                    <DetailContent :data="competitionData"></DetailContent>
                </ContentSkeleton>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import ContentSkeleton from './components/ContentSkeleton.vue';
import { onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from './components/PageHeader.vue';
import DetailContent from './components/DetailContent.vue';
import useLoginStore from '@/store/loginStore';
import { competitionsDetail } from '@/api/competitions.js'

const store = useLoginStore()
const route = useRoute()
const competitionData = ref([])
const loading = ref(true)
const getData = () => {
    competitionsDetail(route.params.Cid.split('&')[0])
        .then(res => {
            if (res.code === 200) {
                competitionData.value = res.data
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

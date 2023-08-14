<template>
    <el-row justify="center">
        <el-col :span="store.isTeacher ? 24 : 18">
            <div class="grid-content">
                <PageHeader :data="competitionData"></PageHeader>
            </div>
        </el-col>
    </el-row>
    <el-row justify="center">
        <el-col :span="store.isTeacher ? 24 : 18">
            <div class="grid-content">
                <ContentSkeleton :loading="loading">
                    <DetailContent :data="competitionData" v-model:isSignUp="isSignUp"></DetailContent>
                </ContentSkeleton>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import ContentSkeleton from './components/ContentSkeleton.vue';
import { onMounted, ref, provide } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import PageHeader from './components/PageHeader.vue';
import DetailContent from './components/DetailContent.vue';
import useUserStore from '../../../store/userStore'
import axios from 'axios'

const store = useUserStore()
const route = useRoute()
const competitionData = ref()
const isSignUp = ref(false)
const loading = ref(true)
const getData = () => {
    setTimeout(() => {
        axios.get(`http://localhost:3000/competitions?id=${route.params.Cid}`)
            .then(res => {
                competitionData.value = res.data[0]
                competitionData.value.signUpList.map((item) => {
                    if (item.leaderId === store.userInformation.id)
                        isSignUp.value = true
                })
                loading.value = false
            })
            .catch(err => {
                ElMessage.error(err)
                console.log(err)
            })
    }, 1000)
}
onMounted(() => {
    getData()
})
provide('isSignUp', isSignUp)
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

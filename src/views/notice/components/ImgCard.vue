<template>
    <ImgCardSkeleton :loading="loading">
        <el-card class="card">
            <img src="https://jsj.suse.edu.cn/_rest/linker_allfile.ashx?parr=news%2c638259206548557676%2c.jpeg%2c0%2c0%2c202307252224%2ce82aa68ad202b16f883686f354088a6c&said=636059516973492676"
                alt="KDD" class="image" />
            <div>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <!-- <el-collapse-item v-for="(item, index) in specialNotice" :key="item.id" :name="index + ''">
                        <template #title>
                            <el-tooltip class="box-item" effect="dark" :content="item.title" placement="top-start">
                                <div class="card-title">{{ item.title }}</div>
                            </el-tooltip>
                        </template>
                        <div>
                            {{ item.content }}
                        </div>
                    </el-collapse-item> -->
                    <el-collapse-item :title="specialNotice!.title" name="0">
                        <template #title>
                            <el-tooltip class="box-item" effect="dark" :content="specialNotice!.title"
                                placement="top-start">
                                <div class="card-title">{{ specialNotice!.title }}</div>
                            </el-tooltip>
                        </template>
                        <div>
                            {{ specialNotice!.content }}
                        </div>
                    </el-collapse-item>
                    <!-- <el-collapse-item :title="store.noticeFilter[0]?.title" name="0">
                    <div>
                        {{ store.noticeFilter[0]?.content }}
                    </div>
                </el-collapse-item> -->

                </el-collapse>
            </div>
        </el-card>
    </ImgCardSkeleton>
</template>
  
<script lang="ts" setup>
import ImgCardSkeleton from './ImgCardSkeleton.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// import useNoticeStore from '../../../store/noticeStore';
// const store = useNoticeStore()
const activeNames = ref([''])
const specialNotice = ref<{
    title: string,
    author: string,
    content: string,
    id: number,
    special: boolean,
}>()
const handleChange = (val: string[]) => {
}
const loading = ref<boolean>(true)
onMounted(() => {
    setTimeout(() => {
        axios.get("http://localhost:3000/notice?special=true")
            .then(res => {
                if (res.data.length !== 0)
                    specialNotice.value = res.data[0]
                loading.value = false
            })
            .catch(err => {
                console.error(err)
                ElMessage.error(err)
            })
    }, 1000)
    // store.getNoticeList()
})
</script>
  
<style lang="scss" scoped>
.image {
    width: 100%;
    display: block;
}

.card-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
  
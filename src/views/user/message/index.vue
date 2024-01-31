<template>
    <div class="message-box" v-loading="loading">
        <div class="message-content-box">
            <el-row justify="space-around">
                <el-col :span="8">
                    <div class="messageList-box">
                        <div v-if="JSON.stringify(messageData) !== '[]'">
                            <Sidebar :data="messageData"></Sidebar>
                        </div>
                        <el-empty description="暂无消息" style="height: 640px;" v-else>
                        </el-empty>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div>
                        <router-view :data="messageData" @getData="handleGetData" v-if="!isShowMessageLogo"></router-view>
                    </div>
                    <el-empty description=" " style="height: 640px;" v-if="isShowMessageLogo">
                        <template #image>
                            <el-icon :size="175">
                                <Promotion />
                            </el-icon>
                        </template>
                    </el-empty>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script setup>
import Sidebar from './components/Sidebar.vue';
import { onMounted, ref, watch } from 'vue'
import { inviteMessage } from '@/api/message.js'
import { Promotion } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import useLoginStore from '@/store/loginStore';

const store = useLoginStore()
const route = useRoute()
const messageData = ref()
const isShowMessageLogo = ref(false)
const loading = ref(true)
const getData = () => {
    inviteMessage(store.GET_ROLE() === '1' ? 'group' : 'teacher')
        .then(res => {
            if (res.code === 200) {
                messageData.value = res.data
                loading.value = false
            }
        })
        .catch(err => console.log(err))
}
watch(route, () => {
    if (route.path === '/user/message')
        isShowMessageLogo.value = true
    else
        isShowMessageLogo.value = false
},
    {
        immediate: true
    })
onMounted(() => {
    getData()
})
const handleGetData = () => {
    isShowMessageLogo.value = true
    getData()
}
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

.message-box {
    min-height: 100%;
    border-left: none;
}

.message-content-box {
    border-radius: 0 15px 15px 0;
    background-color: #FFFFFF;

}

.messageList-box {
    border-right: 2px solid #F2F6FC;
}
</style>
  

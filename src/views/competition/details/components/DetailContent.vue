<template>
    <div class="main">
        <div class="top-box">
            <el-row justify="space-between">
                <el-col :span="18">
                    <div class="text-title-box">
                        <h1>{{ data?.match.matchname }}</h1>
                    </div>
                    <div class="date-box">
                        <el-icon>
                            <Clock />
                        </el-icon>
                        <span>{{ formattedStartDate }}-{{ formattedFinishDate }}</span>
                    </div>
                    <div class="signUp-box" v-if="store.role === '1' && route.params.Cid.split('&')[1] === '0'">
                        <el-button type="primary" @click="handleSignUp" size="large">申请报名</el-button>
                    </div>
                    <div class="signUp-box" v-if="store.role === '1' && route.params.Cid.split('&')[1] === '-1'">
                        <el-button type="primary" @click="handleSignUp" size="large" plain loading>活动未开始</el-button>
                    </div>
                    <div class="signUp-box" v-if="store.role === '1' && route.params.Cid.split('&')[1] === '1'">
                        <el-button type="danger" @click="handleSignUp" size="large" plain disabled>活动已结束</el-button>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div>
                        <img :src="data?.match.headimage ? data?.match.headumage : '/src/assets/school.jpg'" alt=""
                            style="width:200px;max-height: 300px;margin-bottom: 35px;">
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-card class="text-content-box" shadow="never">
            <div>
                <div>
                    <div class="content-title">
                        <span class="title-icon">
                            <el-icon color="#337ecc">
                                <CollectionTag />
                            </el-icon>
                        </span>
                        <span>
                            <h4>活动内容</h4>
                        </span>
                    </div>
                    <div class="content-text">
                        {{ data?.match.content }}
                        <div style="text-align: center;margin:20px 0;">
                            <!-- 'http://140.143.139.167' +  -->
                            <img :src="data?.match.headimage" :alt="data?.match.matchname" style="width:800px;">
                        </div>
                    </div>
                </div>
                <div class="content-title" v-if="JSON.stringify(data?.matchfiles) !== '[]'">
                    <span class="title-icon">
                        <el-icon color="#337ecc">
                            <Folder />
                        </el-icon>
                    </span>
                    <span>
                        <h4>附件列表</h4>
                    </span>
                </div>
                <div class="content-attachments">
                    <div v-for="item in data?.matchfiles">
                        <el-link :icon="Link" :underline="true" :href="'http://140.143.139.167' + item.matchfile"
                            target="_blank">{{ item.matchfilename }}</el-link>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card class="text-content-box" shadow="never" v-if="data?.match.maxlevel !== 0">
            <div v-if="data?.match.maxlevel !== 0">
                <div class="content-title">
                    <span class="title-icon">
                        <el-icon color="#337ecc">
                            <Trophy />
                        </el-icon>
                    </span>
                    <span>
                        <h4>获奖名单</h4>
                    </span>
                </div>
                <div class="content-text">
                    {{ data?.match.content }}
                </div>
            </div>
        </el-card>
        <SignUpDialog v-model="signUp" :id="data?.id"></SignUpDialog>
    </div>
</template>

<script setup>
import { Clock, CollectionTag, Link, Folder, Trophy } from '@element-plus/icons-vue'
import SignUpDialog from './SignUpDialog.vue'
import { computed, ref } from 'vue'
import useLoginStore from '@/store/loginStore';
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useLoginStore()
const signUp = ref(false)
const props = defineProps({
    data: {
        type: Object
    }
})
const formattedStartDate = computed(() => {
    return props.data?.match.starttime.split('T')[0].split('-').join('.')
})
const formattedFinishDate = computed(() => {
    return props.data?.match.deadline.split('T')[0].split('-').join('.')
})
const handleSignUp = () => {
    signUp.value = true
}


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

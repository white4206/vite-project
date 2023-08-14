<template>
    <div class="message-box">
        <div class="title-time">{{ "2023-08-14" }}</div>
        <div class="content-text">
            您收到了一条来自
            <el-popover :width="250">
                <template #reference>
                    <el-link>{{ data?.addressee.name }}</el-link>
                </template>
                <div class="option-item">
                    <el-collapse style="width:100%">
                        <el-collapse-item name="1">
                            <template #title>
                                <img :src="data?.addressee.avatarUrl" :alt="data?.addressee.name" width="25">
                                <span>{{ data?.addressee.nickname }}</span>
                            </template>
                            <div style="margin-top: 5px;">姓名：{{ data?.addressee.name }}</div>
                            <div style="margin-top: 5px;">手机号：{{ data?.addressee.phoneNumber }}</div>
                            <div style="margin-top: 5px;">邮箱号：{{ data?.addressee.email }}</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-popover>
            {{ data?.type === 'teacher' ? '老师' : '' }}的邀请回复信息，该用户{{ data?.isReply === 'agree' ? '同意' : "拒绝" }}{{ data?.type
                === 'teacher' ? '指导您的团队' : '加入您的团队' }}——
            <el-popover :width="350">
                <template #reference>
                    <el-link>{{ data?.team.name }}</el-link>
                </template>
                <div class="option-item">
                    <img :src="data?.team.logoUrl" :alt="data?.team.name" width="25">
                    <span>{{ data?.team.name }}</span>
                    <span>已有{{ data?.team.member?.length }}名成员</span>
                </div>
            </el-popover>。若更改团队信息，可在“团队管理-我创建的”中更改自己创建的团队信息！
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isShowMore = ref(false)
const props = defineProps({
    data: {
        type: Object
    }
})
</script>

<style lang="scss" scoped>
.message-box {
    padding: 20px 60px
}

.title-time {
    font-size: 14px;
    text-align: right;
    color: #909399
}

.content-text {
    line-height: 30px;
    margin: 25px 0;
}

.option-item {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
        padding-left: 10px;
    }
}

.button-box {
    text-align: right;
}
</style>

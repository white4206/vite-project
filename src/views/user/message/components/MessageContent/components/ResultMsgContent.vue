<template>
    <div class="message-box">
        <div class="title-time">{{ "2023-08-14" }}</div>
        <div class="content-text">
            您已{{ data?.isReply === 'agree' ? '同意' : '拒绝' }}来自
            <el-popover :width="250">
                <template #reference>
                    <el-link>{{ data?.sender.name }}</el-link>
                </template>
                <div class="option-item">
                    <el-collapse style="width:100%">
                        <el-collapse-item name="1">
                            <template #title>
                                <img :src="data?.sender.avatarUrl" :alt="data?.sender.name" width="25">
                                <span>{{ data?.sender.nickname }}</span>
                            </template>
                            <div style="margin-top: 5px;">姓名：{{ data?.sender.name }}</div>
                            <div style="margin-top: 5px;">手机号：{{ data?.sender.phoneNumber }}</div>
                            <div style="margin-top: 5px;">邮箱号：{{ data?.sender.email }}</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-popover>
            的团队——
            <el-popover :width="350">
                <template #reference>
                    <el-link>{{ data?.team.name }}</el-link>
                </template>
                <div class="option-item">
                    <img :src="data?.team.logoUrl" :alt="data?.team.name" width="25">
                    <span>{{ data?.team.name }}</span>
                    <span>已有{{ data?.team.member?.length }}名成员</span>
                </div>
            </el-popover>
            的邀请！
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

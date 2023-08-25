<template>
    <el-menu :default-active="defaultActive" class="el-message-menu" router>
        <el-menu-item :index="'/user/message/messageContent/' + item?.id" v-for="item in data" :key="item?.id">
            <div>
                <div>邀请信息</div>
                <div style="text-indent: 2em;"> 您收到了一条团队邀请信息</div>
                <div class="title-time">{{ "2023-xx-xx" }}</div>
            </div>
        </el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    data: {
        type: Array
    }
})
const route = useRoute()
const defaultActive = computed(() => {
    return route.path
})
</script>

<style lang="scss" scoped>
.el-message-menu {
    border-right: none;
    min-height: 640px;
    border-radius: 15px;
}

.el-menu-item {
    height: 80px;
    border: 1px solid #F2F6FC;
}

.is-active {
    border-left: 5px solid #409EFF;
}

.el-menu-item {
    align-items: center;
}

.el-menu-item {
    div {
        width: 100%;

        div {
            margin-top: 5px;
            height: 20px;
            line-height: 20px;
        }
    }

}

.title-time {
    font-size: 14px;
    text-align: right;
    color: #909399
}
</style>

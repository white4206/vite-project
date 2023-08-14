<template>
    <div class="box">
        <el-pagination :page-size="7" :pager-count="9" layout="prev, pager, next" :total="messageCount"  />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    messageCount: {
        type: Number
    }
})
</script>

<style lang="scss" scoped>
.box {
    border: 1px solid #F2F6FC;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
}
</style>

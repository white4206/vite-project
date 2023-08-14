<template>
    <el-dialog :close-on-click-modal="false" width="35%" :destroy-on-close="true" :align-center="true"
        :close-on-press-escape="false" @close="handleCancel">
        <div class="dialog-box">
            <el-result icon="warning" title="报名信息审核不通过" sub-title="">
                <template #sub-title>
                    <p>提示信息：报名附件不符合规范，请重新上传!</p>
                </template>
                <template #extra>
                    <el-button type="primary" @click="handleClick">修改报名信息</el-button>
                </template>
            </el-result>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'update:isChangeInfo'])
const handleClick = () => {
    emit('update:modelValue', false)
    emit('update:isChangeInfo', true)
}
const handleCancel = () => {
    emit('update:modelValue', false)
}
</script>
<style lang="scss" scoped>
.dialog-box {
    padding: 0 50px;
}
</style>

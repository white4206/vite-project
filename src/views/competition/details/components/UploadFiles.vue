<template>
    <div class="uploadFiles-box">
        <el-upload ref="uploadRef" drag action="#" :on-change="handleChange" :auto-upload="false" :file-list="uploadFiles"
            :limit="2">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖拽到此处/<em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    上传文件大小不可超过xxmb
                </div>
            </template>
        </el-upload>
    </div>
</template>
  
<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps({
    files: {
        type: Object
    }
})
const emit = defineEmits(['uploadFile'])
const uploadFiles = ref(props.files)
const uploadRef = ref()
const handleChange = (rawFile, rawFileList) => {

    if (rawFileList.length > 1) {
        rawFileList.splice(0, 1);
    }
    uploadFiles.value = rawFileList
    emit('uploadFile', uploadFiles.value)
}
</script>

<style>
.uploadFiles-box {
    width: 100%;
}
</style>

<template>
    <el-form label-width="60px" label-position="left" size="large">
        <el-form-item label="头像">
            <el-upload class="avatar-uploader" action="" :auto-upload="false" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-change="UploadImage">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <label class="tips">仅支持JPG、PNG格式，文件小于1M。</label>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess = () => {
    console.log("success!")
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
import axios from 'axios';
const UploadImage = () => {
    axios.post("http://localhost:3000", {
        'Content-Type': 'multipart/form-data'
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}
</script>
  
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
  
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.tips {
    
    font-size: 12px;
    color: grey;
}
</style>
  
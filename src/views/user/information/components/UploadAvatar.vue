<template>
    <el-upload v-loading="loading" class="avatar-uploader" action="#" ref="uploadRef" :show-file-list="true"
        list-type="picture-card" :on-change="handleChange" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
        :auto-upload="false" :file-list="uploadFiles" :limit="2">
        <template #tip>
            <div class="el-upload__tip">
                仅支持JPG、GIF、PNG格式，文件小于2M。
            </div>
        </template>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible" align-center width="40%" style="text-align: center;">
        <img :src="dialogImageUrl" alt="Preview Image" style="width:500px;" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadFile, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import axios from 'axios';
import useUserStore from '../../../../store/userStore'

const store = useUserStore()
const imageUrl = ref('')
const uploadRef = ref()
const uploadFiles = ref()

const loading = ref(true)
onMounted(() => {
    setTimeout(() => {
        axios.get(`http://localhost:3000/${store.isTeacher ? "teaUsers" : "users"}?username=${store.isTeacher ? store.userInformation.jobNumber : store.userInformation.studentNumber}`)
            .then(res => {
                if (JSON.stringify(res.data[0].avatar) !== '{}')
                    uploadFiles.value = [res.data[0].avatar]
                loading.value = false
            })
            .catch(err => {
                ElMessage.error(err)
                console.log(err)
            })
    }, 1000)
})
const handleChange: UploadProps['onChange'] = (rawFile, rawFileList) => {

    if (rawFileList.length > 1) {
        rawFileList.splice(0, 1);
    }
    uploadFiles.value = rawFileList
    if (rawFile.raw?.type !== 'image/jpeg' && rawFile.raw?.type !== 'image/png' && rawFile.raw?.type !== 'image/gif') {
        ElMessage.error('logo图片格式必须是JPG、PNG、GIF')
        uploadRef.value.clearFiles()
        return
    } else if (rawFile.raw?.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2MB!')
        uploadRef.value.clearFiles()
        return
    }
    else {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(rawFile.raw!)
        fileReader.onload = () => {
            let tempFile = rawFile
            if (typeof (fileReader.result) === "string") {
                tempFile.url = fileReader.result
                axios.patch(`http://localhost:3000/${store.isTeacher ? "teaUsers" : "users"}/${store.userInformation.id}`, {
                    avatar: tempFile,
                })
                    .then(res => {
                        ElMessage.success("头像上传成功")
                    })
                    .catch(err => {
                        ElMessage.error(err)
                        console.log(err)
                    })
            }
            else
                ElMessage.error("error")
        }
    }
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove = (file: UploadFile) => {
    // uploadFiles.value.splice(0, 1)
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}
</script>

<style lang="scss">
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
    width: 125px;
    height: 125px;
    text-align: center;
}
</style>

<style lang="scss" scoped>
.avatar-uploader .avatar {
    width: 125px;
    height: 125px;
    display: block;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
    width: 125px;
    height: 125px;
}

::v-deep .el-upload--picture-card {
    width: 125px;
    height: 125px;
}
</style>

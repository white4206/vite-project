<template>
    <el-upload v-loading="loading" class="avatar-uploader" action="#" ref="uploadRef" :show-file-list="true"
        list-type="picture-card" :on-change="handleChange" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
        :auto-upload="false" :file-list="uploadFiles" :limit="2">
        <template #tip>
            <div class="el-upload__tip">
                仅支持JPG、GIF、PNG格式，文件小于2M。
                <br />
                （暂不支持上传，功能待完善）
            </div>
        </template>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible" align-center width="40%" style="text-align: center;" :show-close="false">
        <img :src="dialogImageUrl" alt="Preview Image" style="width:500px;" />
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { changeHeadImg, getHeadImg } from '@/api/information.js'
import useLoginStore from '@/store/loginStore.js'

const store = useLoginStore()

const imageUrl = ref('')
const uploadRef = ref()
const uploadFiles = ref()

const loading = ref(true)
onMounted(() => {
    getHeadImg()
        .then(res => {
            if (res.code === 200) {
                if (res.data === null)
                    uploadFiles.value = [
                        {
                            status: "ready",
                            url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                        }
                    ]
                else
                    uploadFiles.value = [
                        {
                            status: "ready",
                            url: 'http://140.143.139.167' + res.data,
                        }
                    ]
                loading.value = false
            }
        })
        .catch(err => console.log(err))
})
const handleChange = (rawFile, rawFileList) => {

    if (rawFileList.length > 1) {
        rawFileList.splice(0, 1);
    }
    if (rawFile.raw?.type !== 'image/jpeg') {
        ElMessage.error('logo图片格式必须是JPG')
        uploadRef.value.clearFiles()
        return
    } else if (rawFile.raw?.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2MB!')
        uploadRef.value.clearFiles()
        return
    }
    else {
        let formData = new FormData()
        formData.append("headimg", rawFile.raw)
        changeHeadImg(formData)
            .then(res => {
                if (res.code === 200) {
                    uploadFiles.value = [rawFile]
                    ElMessage.success('更换头像成功')
                    store.reloadAvatar()
                }
            })
            .catch(err => console.log(err))
    }
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove = () => {
    // uploadFiles.value.splice(0, 1)
}

const handlePictureCardPreview = () => {
    dialogImageUrl.value = file.url
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

<template>
    <el-upload class="avatar-uploader" action="http://localhost:3000/uploadImg" ref="uploadRef" :show-file-list="true"
        list-type="picture-card" :on-change="handleChange" :on-success="handleSuccess" :before-upload="beforeUpload"
        :on-exceed="handleExceed" :auto-upload="false" :file-list="fileList" :limit="1">
        <template #tip>
            <div class="el-upload__tip">
                仅支持JPG、GIF、PNG格式，文件小于2M。
            </div>
        </template>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
        <template #file="{ file }">
            <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <el-icon><zoom-in /></el-icon>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </span>
                </span>
            </div>
        </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
        <img :src="dialogImageUrl" alt="Preview Image" style="width:100%" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

const props = defineProps({
    form: {
        type: Object
    },
    fileList: {
        type: Object
    }
})
const imageUrl = ref('')
const uploadRef = ref()
// const base64 = ref()
const handleSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg'&& rawFile.raw?.type !== 'image/png') {
    //     ElMessage.error('Avatar picture must be JPG format!')
    //     return false
    // } else if (rawFile.size / 1024 / 1024 > 2) {
    //     ElMessage.error('Avatar picture size can not exceed 2MB!')
    //     return false
    // }
    // return true
}
const handleExceed: UploadProps['onExceed'] = (rawFile) => {
    ElMessage.warning("只能上传一张logo图片，请先删除已上传图片")
}
const handleChange: UploadProps['onChange'] = (rawFile, rawFileList) => {
    /*     let formData = new FormData()
        formData.append("file", rawFile.raw!)
        console.log(formData.getAll("file")) */
    // axios.post("http://localhost:3000/uploadImg", formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    // })
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    // {
    //     method: "post",
    //     url: "http://localhost:3000/uploadImg",
    //     data: formData,
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // }

    //选用
    // fileList.value = rawFileList
    if (rawFile.raw?.type !== 'image/jpeg' && rawFile.raw?.type !== 'image/png'&&rawFile.raw?.type!=='image/gif') {
        ElMessage.error('logo图片格式必须是JPG、PNG、GIF')
        uploadRef.value.clearFiles()
        return
    } else if (rawFile.raw?.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2MB!')
        uploadRef.value.clearFiles()
        return
    }
    else {


        // 此处是临时代替后端处理图片后返回图片服务器地址的代码片段,
        // props是单项绑定数据流，不可修改父组件传过来的值（基本数据类型）,但此处是复杂类型，传递过来的是引用类型，所以可以更改且不报错
        // 若修改整个复杂类型则控制台报错

        props.form!.logo = rawFile
        const fileReader = new FileReader()
        fileReader.readAsDataURL(rawFile.raw!)
        fileReader.onload = () => {
            // base64.value = fileReader.result
            /*  form.logoURL = fileReader.result */
            props.form!.logo.url = fileReader.result
            // imageUrl.value = form.logoURL
            // console.log(base64)
            // let fakeImgData = { ...rawFile, url: base64 }
            // axios.post("http://localhost:3000/uploadImg", fakeImgData)
            //     .then(res => {
            //         // imageUrl.value = URL.createObjectURL(rawFile.raw!)
            //     })
            //     .catch(err => console.log(err))
        }
    }
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const handleRemove = (file: UploadFile) => {
    // fileList.value.splice(0, 1)
    uploadRef.value.handleRemove(file)
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
</style>

<template>
    <el-upload class="avatar-uploader" action="#" ref="uploadRef" :show-file-list="true" list-type="picture-card"
        :on-change="handleChange" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false"
        :file-list="uploadFiles" :limit="2" :on-success="handleSuccess" :before-upload="beforeUpload" disabled>
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
    <el-dialog v-model="dialogVisible" align-center width="40%" style="text-align: center;">
        <img :src="dialogImageUrl" alt="Preview Image" style="width:500px" />
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
    form: {
        type: Object
    },
    logoFile: {
        type: Object
    }
})
const uploadFiles = ref(props.logoFile)
const imageUrl = ref('')
const uploadRef = ref()
// const base64 = ref()
const handleSuccess = (
    response,
    uploadFile
) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const beforeUpload = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg'&& rawFile.raw?.type !== 'image/png') {
    //     ElMessage.error('Avatar picture must be JPG format!')
    //     return false
    // } else if (rawFile.size / 1024 / 1024 > 2) {
    //     ElMessage.error('Avatar picture size can not exceed 2MB!')
    //     return false
    // }
    // return true
}
const handleChange = (rawFile, rawFileList) => {
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
    if (rawFileList.length > 1) {
        rawFileList.splice(0, 1);
    }
    // uploadFiles.value = rawFileList
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
        // 此处是临时代替后端处理图片后返回图片服务器地址的代码片段,
        // props是单项绑定数据流，不可修改父组件传过来的值（基本数据类型）,但此处是复杂类型，传递过来的是引用类型，所以可以更改且不报错
        // 若修改整个复杂类型则控制台报错

        // props.form.logo = rawFile
        // const fileReader = new FileReader()
        // fileReader.readAsDataURL(rawFile.raw)
        // fileReader.onload = () => {
        //     // base64.value = fileReader.result
        //     /*  form.logoURL = fileReader.result */
        //     props.form?.logo.url = fileReader.result
        //     // imageUrl.value = form.logoURL
        //     // console.log(base64)
        //     // let fakeImgData = { ...rawFile, url: base64 }
        //     // axios.post("http://localhost:3000/uploadImg", fakeImgData)
        //     //     .then(res => {
        //     //         // imageUrl.value = URL.createObjectURL(rawFile.raw!)
        //     //     })
        //     //     .catch(err => console.log(err))
        // }
    }
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove = (file) => {
    // fileList.value.splice(0, 1)
}

const handlePictureCardPreview = (file) => {
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
    width: 75px;
    height: 75px;
}

::v-deep .el-upload--picture-card {
    width: 75px;
    height: 75px;
}
</style>

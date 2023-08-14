<template>
    <el-avatar size="" :src="circleUrl" />
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
import useUserStore from "../../../store/userStore"
import axios from 'axios'

const store = useUserStore()
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const getData = () => {
    axios.get(`http://localhost:3000/${store.isTeacher ? 'teaUsers' : "users"}?username=${store.isTeacher ? store.userInformation.jobNumber : store.userInformation.studentNumber}`)
        .then(res => {
            if (res.data[0].avatar.url)
                circleUrl.value = res.data[0].avatar.url
        })
        .catch(err => {
            ElMessage.error(err)
            console.log(err)
        })
}
onMounted(() => {
    getData()
})
</script>
  
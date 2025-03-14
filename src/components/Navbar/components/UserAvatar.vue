<template>
  <el-avatar :src="store.avatarUrl"/>
</template>

<script setup>
import {onMounted} from 'vue'
import useLoginStore from '@/store/loginStore.js'

const store = useLoginStore()
const getData = async () => {
  await store.reloadAvatar()
}
onMounted(() => {
  getData()
})
</script>
  
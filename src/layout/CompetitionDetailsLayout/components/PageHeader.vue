<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 详情页 </span>
    </template>
  </el-page-header>
</template>
<script lang="ts" setup>
import {  useRouter } from "vue-router"

const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

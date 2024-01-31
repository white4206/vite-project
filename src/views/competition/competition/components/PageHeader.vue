<template>
  <el-page-header @back="goBack" title="返回审核列表">
    <template #content>
      <span class="text-large font-600 mr-3">审核详情页</span>
    </template>
  </el-page-header>
</template>

<script setup>
import { useRouter } from "vue-router"

const props = defineProps({
  data: {
    type: Object
  }
})
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style lang="scss">
.el-page-header {
  transition: 0.4s;
}

.el-page-header:hover {
  transform: translateX(-10px);
  transition: 0.4s;
}
</style>

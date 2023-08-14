<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main style="min-height: 500px;">
        <router-view></router-view>
      </el-main>
      <el-footer style="margin-top: 200px;">
        <Bottom></Bottom>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import Bottom from "./components/Bottom/index.vue"
import Navbar from "./components/Navbar/index.vue"
// import { provide, ref } from 'vue'

// const isLogged = ref(false)
// provide('isLogged', isLogged)
</script>

<style lang="scss" scoped>
</style>

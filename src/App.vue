<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar/Navbar.vue"
import { provide, ref } from 'vue'

const isLogged = ref(false)
provide('isLogged', isLogged)
</script>

<style scoped>
</style>

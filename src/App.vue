<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <div style="min-height: 750px">
        <router-view></router-view>
        <el-backtop :bottom="100" />
      </div>
      <el-footer>
        <Bottom></Bottom>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import Bottom from "./components/Bottom/index.vue";
import Navbar from "./components/Navbar/index.vue";
</script>

<style lang="scss" scoped></style>

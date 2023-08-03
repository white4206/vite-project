<template>
    <el-menu default-active="1">
        <el-menu-item :index="item.toString()" v-for="item in 7" key="item">
            <span>
                <div>{{ item }}</div>
            </span>
        </el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.el-menu {
    border-right: none;
    border-left: 1px solid #dcdfe6;
    height: 560px;
}

.el-menu-item {
    height: 80px;
    border: 1px solid #f3f3f3
}

.is-active {
    border-left: 5px solid #409EFF;
    border-right: none;
}
</style>

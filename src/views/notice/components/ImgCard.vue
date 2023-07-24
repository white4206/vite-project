<template>
    <el-card class="card">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />
        <div>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="通知1" name="1">
                    <div>
                        内容
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </el-card>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
}
</script>
  
<style lang="scss" scoped>
.image {
    width: 100%;
    display: block;
}
</style>
  
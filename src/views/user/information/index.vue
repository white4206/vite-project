<template>
    <el-row>
        <el-col :span="8">
            <div class="grid-content">
                <UploadAvatar></UploadAvatar>
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content information-box">
                <SelfInformation></SelfInformation>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import SelfInformation from './components/SelfInformation.vue';
import UploadAvatar from './components/UploadAvatar.vue';
</script>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    min-height: 36px;
}

.information-box {
    border-left: 2px dotted rgb(226, 225, 225);
    padding: 0 75px;
}
</style>
  

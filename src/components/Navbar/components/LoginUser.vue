<template>
  <el-sub-menu index="5">
    <template #title>
      <UserAvatar></UserAvatar>
    </template>
    <el-menu-item index="/user">
      <el-icon>
        <User/>
      </el-icon>
      <span>个人中心</span>
    </el-menu-item>
    <!--    <el-menu-item index="/analyze">-->
    <!--      <el-icon>-->
    <!--        <Histogram />-->
    <!--      </el-icon>-->
    <!--      <span>我的分析</span>-->
    <!--    </el-menu-item>-->
    <el-menu-item index="/apply">
      <el-icon>
        <Document/>
      </el-icon>
      <span>申请奖项</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <el-icon>
        <Edit/>
      </el-icon>
      <span>修改密码</span>
    </el-menu-item>
    <el-menu-item index="/login" @click="handleExit">
      <el-icon>
        <svg t="1691848527714" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="2699" width="200" height="200">
          <path
              d="M874.666667 855.744a19.093333 19.093333 0 0 1-19.136 18.922667H168.469333A19.2 19.2 0 0 1 149.333333 855.530667V168.469333A19.2 19.2 0 0 1 168.469333 149.333333h687.061334c10.581333 0 19.136 8.533333 19.136 18.922667V320h42.666666V168.256A61.717333 61.717333 0 0 0 855.530667 106.666667H168.469333A61.866667 61.866667 0 0 0 106.666667 168.469333v687.061334A61.866667 61.866667 0 0 0 168.469333 917.333333h687.061334A61.76 61.76 0 0 0 917.333333 855.744V704h-42.666666v151.744zM851.84 533.333333l-131.797333 131.754667a21.141333 21.141333 0 0 0 0.213333 29.973333 21.141333 21.141333 0 0 0 29.973333 0.192l165.589334-165.589333a20.821333 20.821333 0 0 0 6.122666-14.976 21.44 21.44 0 0 0-6.314666-14.997333l-168.533334-168.533334a21.141333 21.141333 0 0 0-29.952-0.213333 21.141333 21.141333 0 0 0 0.213334 29.973333L847.296 490.666667H469.333333v42.666666h382.506667z"
              fill="#000000" p-id="2700"></path>
        </svg>
      </el-icon>
      <span>登出</span>
    </el-menu-item>
  </el-sub-menu>
</template>

<script setup>
import UserAvatar from './UserAvatar.vue';
import {User, Edit, Document} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus';
import useLoginStore from '@/store/loginStore';
import {logout} from '@/api/login.js'

const store = useLoginStore()
const handleExit = () => {
  logout()
      .then(res => {
        if (res.code === 200) {
          store.isLogin = false
          store.REMOVE_TOKEN()
        }
      })
      .catch(err => {
        console.log(err)
        ElMessage.error(err)
      })
  ElMessage.error("退出登录")
}
</script>

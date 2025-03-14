<template>
  <div class="message-box">
    <div class="title-time">{{ "2023-xx-xx" }}</div>
    <div class="content-text">
      您收到了一条来自
      <el-popover :width="225">
        <template #reference>
          <el-link>{{ messageData.creater?.nickName }}</el-link>
        </template>
        <div class="option-item">
          <el-collapse style="width:100%">
            <el-collapse-item name="1">
              <template #title>
                <img
                    :src="messageData.creater?.avatarUrl ? messageData.creater?.avatarUrl : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                    :alt="messageData.creater?.nickname" width="25">
                <span>{{ messageData.creater?.nickname }}</span>
              </template>
              <div style="margin-top: 5px;">手机号：{{
                  messageData.creater?.tel ? messageData.creater?.tel
                      : '用户信息未完善'
                }}
              </div>
              <div style="margin-top: 5px;">邮箱号：{{
                  messageData.creater?.email ? messageData.creater?.email : '用户信息未完善'
                }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-popover>
      的团队——
      <el-popover :width="225">
        <template #reference>
          <el-link>{{ messageData.groupName }}</el-link>
        </template>
        <div class="option-item">
          <img :src="messageData.logoUrl ? messageData.logoUrl : 'src/assets/team.png'"
               :alt="messageData.groupName" width="25">
          <span>{{ messageData.groupName }}</span>
          <!-- <span>已有{{ data?.team.member?.length }}名成员</span> -->
        </div>
      </el-popover>
      的邀请信息,
      <br/>请选择是否{{ store.GET_ROLE() === '1' ? '加入' : '指导' }}该团队
    </div>
    <div class="button-box">
      <el-button type="primary" @click="handleAccept">接受</el-button>
      <el-button type="danger" @click="handleRefuse">拒绝</el-button>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import {useRoute} from 'vue-router';
import {userInfo, handleInvite} from '@/api/message.js'
import useLoginStore from "@/store/loginStore.js";

const store = useLoginStore()
const route = useRoute()
const props = defineProps({
  data: {
    type: Object
  }
})
onMounted(() => {

})
const emit = defineEmits(['getData'])
const messageData = ref([])
watch(route, () => {
      props.data?.map(item => {
        if (item.id == route.params.Mid) {
          messageData.value = item
          userInfo({
            isTeacher: 0,
            userid: item.createrId
          })
              .then(res => {
                messageData.value.creater = res.data
              })
              .catch(err => console.log(err))

        }
      })
    },
    {
      immediate: true
    })
const handleAccept = () => {
  handleInvite({
    groupId: messageData.value.id,
    status: 1
  }, messageData.value.id)
      .then(res => {
        if (res.code === 200) {
          ElMessage.success(`您已同意${store.GET_ROLE() === '1' ? '加入' : '指导'}该团队`)
          emit('getData')
        }

      })
      .catch(err => {
        console.log(err)
        ElMessage.error(err)
      })
}
const handleRefuse = () => {
  handleInvite({
    groupId: messageData.value.id,
    status: 0
  }, messageData.value.id)
      .then(res => {
        if (res.code === 200) {
          ElMessage.warning('您已拒绝加入该团队')
          emit('getData')
        }
      })
      .catch(err => {
        console.log(err)
        ElMessage.error(err)
      })
}
</script>

<style lang="scss" scoped>
.message-box {
  padding: 20px 60px;

}

.title-time {
  font-size: 14px;
  text-align: right;
  color: #909399
}

.content-text {
  line-height: 30px;
  margin: 25px 0;
}

.option-item {
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    padding-left: 10px;
  }
}

.button-box {
  text-align: right;
}
</style>

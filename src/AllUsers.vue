<template>
  <div class="all-users">
    <h1>所有用户</h1>
    <div v-if="loading">加载中...</div>
    <ul v-else>
      <li v-for="user in allUsers" :key="user.id">
        {{ user.username }} - {{ user.user_id }} - {{user.role  }}
        <button @click="delete_user(user.user_id)">注销此用户</button>
        <button @click="change_role(user.user_id)">改变用户身份</button>
        <button @click="get_friendlist(user.user_id)">查看好友列表</button>
      </li>
    </ul>
    <button @click="goBack">返回首页</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserList, deleteUser, userDetail,changeRole } from './api'

const router = useRouter()
const allUsers = ref([])
const loading = ref(true)

// 模拟获取所有用户数据
onMounted(async () => {
  const user_list = await getUserList()
  if(user_list.status==false){
    alert('出错了')
  }
  else{
  console.log(user_list)
  allUsers.value = user_list.data
  loading.value = false
  }
})

const delete_user = async (user_id) => {
  const result = await deleteUser(user_id)
  if (result.status == true) {
    // 删除成功后，刷新在线用户列表
    const user_list = await getUserList()
    if (user_list.status == false) {
      alert('刷新用户列表失败')
    } else {
      allUsers.value = user_list.data
    }
  } else {
    alert(result.message)
  }
}
const change_role=async(user_id)=>{
  user_id = Number(user_id)
  const info=await userDetail(user_id)
    if(info.status==true){
      if(info.data.role=='Admin'){
        const result=await changeRole(user_id,'User')
        console.log(result)
        if (result.status==true){
          alert('已改为普通用户')
        }
        else{
          alert('出错了')
        }
      }
      else if(info.data.role=='User'){
        const result=await changeRole(user_id,'Admin')
        console.log(result)
        if (result.status==true){
          alert('已改为管理员')
        }
        else{
          alert('出错了')
        }
      }
    }
    else{
      alert('出错了')
    }
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.all-users {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
</style>
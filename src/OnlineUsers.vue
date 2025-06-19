<template>
  <div class="online-users">
    <h1>在线用户列表</h1>
    <div v-if="loading">加载中...</div>
    <div v-else>
      <div v-for="(sessions, userId) in onlineUsers" :key="userId" class="user-card">
        <h3>用户 ID: {{ userId }}</h3>
        <ul>
          <li v-for="session in sessions" :key="session.session_id">
            Session ID: {{ session.session_id }} |
            IP: {{ session.ip || '未知' }} |
            登录时间: {{ formatDate(session.created_at) }}
          </li>
        </ul>
      </div>
    </div>
    <button @click="goBack">返回首页</button>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getOnlineTree } from './api'
import dayjs from 'dayjs'

const router = useRouter()
const onlineUsers = ref([])
const loading = ref(true)

const formatDate = (dateStr) => {
  const trimmed = dateStr.split('.')[0]  // 去掉.后的多余小数部分
  return dayjs(trimmed).format('YYYY-MM-DD HH:mm:ss')
}

onMounted(async () => {
  const data = await getOnlineTree()
  console.log(data)
  onlineUsers.value = data.data.users
  loading.value = false
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.online-users {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}
.user-card {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}
button {
  margin-top: 2rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  background: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
</style>
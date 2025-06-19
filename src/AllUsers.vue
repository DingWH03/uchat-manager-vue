<template>
  <div class="all-users">
    <h1>所有用户</h1>
    <div v-if="loading">加载中...</div>
    <ul v-else>
      <li v-for="user in allUsers" :key="user.id">
        {{ user.username }} - {{ user.user_id }}
        <button @click="zhuxiao">注销此用户</button>
      </li>
    </ul>
    <button @click="goBack">返回首页</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserList } from './api'

const router = useRouter()
const allUsers = ref([])
const loading = ref(true)

// 模拟获取所有用户数据
onMounted(async () => {
  const user_list = await getUserList()
  console.log(user_list)
  allUsers.value = user_list.data
  loading.value = false
})

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
<template>
  <div class="online-users">
    <h1>在线用户</h1>
    <div v-if="loading">加载中...</div>
    <ul v-else>
      <li v-for="user in onlineUsers" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
    <button @click="goBack">返回首页</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onlineUsers = ref([])
const loading = ref(true)

// 模拟获取在线用户数据
onMounted(() => {
  setTimeout(() => {
    onlineUsers.value = [
      { id: 1, name: '张三', email: 'zhangsan@example.com' },
      { id: 2, name: '李四', email: 'lisi@example.com' },
      { id: 3, name: '王五', email: 'wangwu@example.com' }
    ]
    loading.value = false
  }, 1000)
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.online-users {
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
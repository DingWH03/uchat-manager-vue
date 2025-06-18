<template>
  <div class="all-users">
    <h1>所有用户</h1>
    <div v-if="loading">加载中...</div>
    <ul v-else>
      <li v-for="user in allUsers" :key="user.id">
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
const allUsers = ref([])
const loading = ref(true)

// 模拟获取所有用户数据
onMounted(() => {
  setTimeout(() => {
    allUsers.value = [
      { id: 1, name: '张三', email: 'zhangsan@example.com' },
      { id: 2, name: '李四', email: 'lisi@example.com' },
      { id: 3, name: '王五', email: 'wangwu@example.com' },
      { id: 4, name: '赵六', email: 'zhaoliu@example.com' },
      { id: 5, name: '钱七', email: 'qianqi@example.com' }
    ]
    loading.value = false
  }, 1000)
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
<template>
  <div class="login-container" v-if="!isLoggedIn">
    <h1>管理员登录</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="userId" type="text" placeholder="用户ID" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Login, checkSession } from './api'

const router = useRouter()

const userId = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoggedIn = ref(false) // 响应式登录状态

// 页面加载时检查 cookie 中是否已有 session_id
onMounted(async () => {
  if (await checkSession()) {
    isLoggedIn.value = true
    router.push('/dashboard') // 自动跳转已登录用户
  }
})

const handleLogin = async () => {
  errorMessage.value = ''
  const result = await Login(parseInt(userId.value), password.value)
  if(result.status){
    router.push('/dashboard')
  } else {
    errorMessage.value = result.message
  }
}
</script>



<style scoped>
.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f4f6f8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #1565c0;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>

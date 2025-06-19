<template>
  <div class="home">
    <h1>用户管理系统</h1>
    <div class="user-cards">
      <div class="card online-users" @click="goToOnlineUsers">
        <h2>在线用户</h2>
        <p>点击查看当前在线用户</p>
      </div>
      
      <div class="card all-users" @click="goToAllUsers">
        <h2>所有用户</h2>
        <p>点击查看所有注册用户</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getUserList } from './api'

const router = useRouter()

const goToOnlineUsers = async () => {
  
  router.push('/online-users')
}

const goToAllUsers = async () => {
  router.push('/all-users')
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.user-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  padding: 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 300px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.online-users {
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
}

.all-users {
  background-color: #e8f5e9;
  border: 1px solid #c8e6c9;
}

h1 {
  color: #2c3e50;
}

h2 {
  margin-top: 0;
  color: #34495e;
}
</style>

import axios from 'axios'
import Cookies from 'js-cookie'

export async function login(user_id, password) {
  
}

export async function getUserList() {
  try {
    const response = await axios.get('/api/manager/user/list', {
      withCredentials: true, // 携带 cookie
    })

    return response.data // 应该是 ManagerResponse<T> 格式
  } catch (error) {
    return { status: false, code: 500, message: error.message, data: null }
  }
}

export async function getOnlineTree() {
  try {
    const response = await axios.get('/api/manager/online/tree', {
      withCredentials: true, // 携带 cookie
    })

    return response.data // 应该是 ManagerResponse<T> 格式
  } catch (error) {
    return { status: false, code: 500, message: error.message, data: null }
  }
}

export async function deleteOnlineSession(session_id) {
  try {
    const response = await axios.delete('/api/manager/online/session', {
      params: { session_id },
      withCredentials: true, // 携带 cookie
    })

    return response.data // 应为 ManagerResponse<...>
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: error.message || '网络错误',
      data: null,
    }
  }
}


export async function deleteUser(user_id) {
  try {
    const response = await axios.delete('/api/manager/user', {
      params: { user_id },
      withCredentials: true, // 携带 cookie
    })

    return response.data // 应为 ManagerResponse<...>
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: error.message || '网络错误',
      data: null,
    }
  }
}

// 检查当前 session 是否有效且身份为管理员
export const checkSession = async () => {
  try {
    const response = await axios.get('/api/auth/check_session', {
      withCredentials: true,
    })
    const data = response.data
    console.log('checkSession response:', data)
    return data.status === true && data.role === 'Admin'
  } catch (e) {
    console.error('checkSession error:', e)
    return false
  }
}

// 登录函数
export const Login = async (userid, password) => {
  let errorMessage = ''
  try {
    const response = await axios.post(
      '/api/auth/login',
      {
        userid: parseInt(userid),
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    const data = response.data
    if (data.status === true && data.message) {
      // 保存 session_id
      Cookies.set('session_id', data.message, { expires: 1 })

      if (await checkSession()) {
        return {status: true, message: 'success'}
      } else {
        Cookies.remove('session_id')
        errorMessage = '非管理员身份'
      }
    } else {
      errorMessage = data.message || '登录失败'
    }
  } catch (error) {
    console.error('handleLogin error:', error)
    errorMessage = '网络错误或服务器异常'
  }
  return {status: false, message: errorMessage}
}


export function logout() {
  Cookies.remove('session_id')
  // 可选重定向
  window.location.href = '/login'
}


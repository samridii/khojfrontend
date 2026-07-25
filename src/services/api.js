import axios from 'axios'

// Axios Instance 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('khoj_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('khoj_token')
      localStorage.removeItem('khoj_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ─── Auth API
export const authAPI = {
  // POST /api/auth/register
  register: ({ name, email, password, role = 'user' }) =>
    api.post('/auth/register', { name, email, password, role }).then(r => r.data),

  // POST /api/auth/login
  login: ({ email, password }) =>
    api.post('/auth/login', { email, password }).then(r => r.data),

  // POST /api/auth/forgot-password
  forgotPassword: ({ email }) =>
    api.post('/auth/forgot-password', { email }).then(r => r.data),

  // POST /api/auth/reset-password/:token
  resetPassword: ({ token, password }) =>
    api.post(`/auth/reset-password/${token}`, { password }).then(r => r.data),

  // GET /api/auth/me
  getMe: () =>
    api.get('/auth/me').then(r => r.data),
}

// Error helper 

export const getApiError = (error) => {
  if (error?.response?.data?.errors?.length) return error.response.data.errors[0]
  if (error?.response?.data?.message)        return error.response.data.message
  if (error?.message)                        return error.message
  return 'Something went wrong. Please try again.'
}

export default api
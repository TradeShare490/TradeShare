import axios from 'axios'

const HOST_BY_MODE = {
  development: process.env.VUE_APP_BACKEND_HOST,
  production: process.env.VUE_APP_BACKEND_DEV
}

const HOST = HOST_BY_MODE[process.env.NODE_ENV] || '//localhost:5000/api/v1'
let user = localStorage.getItem('user')

user = user != null && user.includes('accessToken') ? JSON.parse(user) : { accessToken: '' }
const axiosInstance = axios.create({
  baseURL: `${HOST}`,
  headers: {
    Authorization: `Bearer ${user?.accessToken}`,
    'x-refresh': user?.refreshToken
  }
})

export default axiosInstance

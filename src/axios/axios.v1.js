import axios from 'axios'

const HOST = process.env.VUE_APP_BACKEND_HOST || '//localhost:5000/api/v1'
const axiosInstace = axios.create({
  baseURL: `${HOST}`
})

export default axiosInstace

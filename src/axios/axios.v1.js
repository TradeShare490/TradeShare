import axios from 'axios'

const HOST_BY_MODE = {
	'development': process.env.VUE_APP_BACKEND_HOST,
	'production': process.env.VUE_APP_BACKEND_DEV 
}

const HOST = HOST_BY_MODE[process.env.NODE_ENV] || "//localhost:5000/api/v1";
const axiosInstace = axios.create({
  baseURL: `${HOST}`
})

export default axiosInstace


import axios from 'axios'

const api = axios.create({
    baseURL: 'https://portfolio-ukyo.onrender.com/api'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.request.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken')
        }
        return Promise.reject(error)
    }
)

export default api
import axios from 'axios'

const HttpServer = {}
HttpServer.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.interceptors.request.use(function (config) {
    if (config.url !== 'login') {
      const token = localStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = token
      // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}

export default HttpServer

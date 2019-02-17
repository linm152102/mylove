import axios from 'axios'

const HttpServer = {}
HttpServer.install = function (Vue) {
  // import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  Vue.prototype.$http = axios
}

export default HttpServer

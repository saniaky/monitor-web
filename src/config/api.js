import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
  // withCredentials: true // Pass cookies with requests in axios,
  // headers: {'X-Custom-Header': 'foobar'},
})

export default api

import axios from 'axios'
import applyConverters from 'axios-case-converter'

/*
    Axios transformer/interceptor that converts snake_case/camelCase
    https://www.npmjs.com/package/axios-case-converter

*/

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
  // headers: { Authorization: `Bearer ${token}` }
})

export default applyConverters(axiosClient)

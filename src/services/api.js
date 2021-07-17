import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-free.deepl.com/v2',
  params: {
    auth_key: process.env.REACT_APP_DEEPL_API_KEY
  }
})

export default api

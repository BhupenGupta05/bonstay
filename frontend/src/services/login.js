import axios from 'axios'
import { apiBaseUrl } from '../constants'

const login = async (credentials) => {
  const { data } = await axios.post(`${apiBaseUrl}/login`, credentials)
  return data
}

export default { login }
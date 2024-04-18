import axios from 'axios'
import { apiBaseUrl } from '../constants'

const register = async (details) => {
    const {name, email, password, phone, address} = details
    const {data} = await axios.post(`${apiBaseUrl}/register`, {name, email, password, phone, address})
    return data
}

export default { register }
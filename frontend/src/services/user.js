import axios from 'axios'
import { apiBaseUrl } from '../constants'

const fetchUser = async (token, id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const { data } = await axios.get(`${apiBaseUrl}/user-places/${id}`, config)
    return data
}

export default { fetchUser }
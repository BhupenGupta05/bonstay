import axios from 'axios'
import { apiBaseUrl } from '../constants';

const profile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };
  const { data } = await axios.get(`${apiBaseUrl}/profile`, config);
  return data;
};




export default { profile }
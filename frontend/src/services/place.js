import axios from "axios";
import { apiBaseUrl } from '../constants';

const addPlace = async (token, place) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
    };

    const {data} = await axios.post(`${apiBaseUrl}/places`, place, config)
    return data;
}

const getPlaces = async (token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
  };

  const {data} = await axios.get(`${apiBaseUrl}/user-places`, config)
  return data;
}

const getPlace = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
};

const {data} = await axios.get(`${apiBaseUrl}/places/${id}`, config)
return data;
}

const updatePlace = async (token, id, place) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
};

const {data} = await axios.put(`${apiBaseUrl}/places/${id}`, {id, ...place}, config)
return data;
}


export default { addPlace, getPlaces, getPlace, updatePlace }
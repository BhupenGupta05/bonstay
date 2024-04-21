import axios from 'axios'
import { apiBaseUrl } from '../constants'

const addPlace = async (token, place) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.post(`${apiBaseUrl}/account/places`, place, config)
  return data
}

const fetchPlace = async (id) => {
  const { data } = await axios.get(`${apiBaseUrl}/places/${id}`)
  return data
}


const fetchPlaces = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/places`)
  return data
}

const getPlaces = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.get(`${apiBaseUrl}/user-places`, config)
  return data
}

const getPlace = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.get(`${apiBaseUrl}/account/places/${id}`, config)
  return data
}

const updatePlace = async (token, id, place) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.put(`${apiBaseUrl}/account/places`, { id, ...place }, config)
  return data
}


export default { addPlace, getPlaces, getPlace, updatePlace, fetchPlaces, fetchPlace }
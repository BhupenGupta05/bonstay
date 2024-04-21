import axios from 'axios'
import { apiBaseUrl } from '../constants'

const getBooking = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.get(`${apiBaseUrl}/account/bookings/${id}`, config)
  return data
}

const updateBooking = async (token, id, bookingDetails) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.put(`${apiBaseUrl}/account/bookings/${id}`, bookingDetails, config)
  console.log(data)
  return data
}

const deleteBooking = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.delete(`${apiBaseUrl}/account/bookings/${id}`, config)
  return data
}

const getBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.get(`${apiBaseUrl}/account/bookings`, config)
  return data
}

const addBooking = async (token, place) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.post(`${apiBaseUrl}/account/bookings`, place, config)
  return data
}

export default { getBooking, addBooking, getBookings, updateBooking, deleteBooking }
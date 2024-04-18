import axios from "axios";
import { apiBaseUrl } from "../constants";

const uploadByLink = async (token, link) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
      };
    const {data} = await axios.post(`${apiBaseUrl}/uploadLink`, link, config)
    console.log(data);
    return data;
}

const uploadByDevice = async (token, photo) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-type': 'multipart/form-data'
    },
  };
  const {data} = await axios.post(`${apiBaseUrl}/uploadDevice`, photo, config)
    console.log(data);
    return data;
}

export default {uploadByLink, uploadByDevice}
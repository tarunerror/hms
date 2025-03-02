import axios from 'axios';

const API_URL = '/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Rest of the API functions remain the same
export const createHospital = async (hospitalData) => {
  try {
    const response = await api.post('/hospitals/create', hospitalData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getHospitalsByCity = async (city = '') => {
  try {
    const response = await api.get(`/hospitals${city ? `?city=${city}` : ''}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getHospitalById = async (id) => {
  try {
    const response = await api.get(`/hospitals/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteHospital = async (id) => {
  try {
    const response = await api.delete(`/hospitals/delete?id=${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateHospital = async (id, hospitalData) => {
  try {
    const response = await api.put(`/hospitals/update?id=${id}`, hospitalData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addHospitalDetails = async (id, detailsData) => {
  try {
    const response = await api.post(`/hospitals/details?id=${id}`, detailsData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

import axios from 'axios';

const BASE = `${import.meta.env.VITE_API_URL}/compliments`;

export const getCompliments = () => axios.get(BASE);
export const createCompliment = (data) => axios.post(BASE, data);
export const heartCompliment = (id) => axios.patch(`${BASE}/${id}/heart`);
export const getComplimentByCode = (code) => axios.get(`${BASE}/code/${code}`);
export const deleteCompliment = (id) => axios.delete(`${BASE}/${id}`);
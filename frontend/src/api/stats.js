import axios from 'axios';

const BASE = `${import.meta.env.VITE_API_URL}/stats`;

export const getStats = () => axios.get(BASE);
export const getDailyStats = () => axios.get(`${BASE}/daily`);
export const trackVisit = () => axios.post(`${BASE}/visit`);
export const trackSession = () => axios.post(`${BASE}/session`);
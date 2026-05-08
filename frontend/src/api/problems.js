import axios from 'axios';

const BASE = `${import.meta.env.VITE_API_URL}/problems`;

export const getProblems = (category) =>
  axios.get(BASE, { params: category ? { category } : {} });
export const getProblemById = (id) => axios.get(`${BASE}/${id}`);
export const getProblemByCode = (code) => axios.get(`${BASE}/code/${code}`);
export const createProblem = (data) => axios.post(BASE, data);
export const addAdvice = (id, data) => axios.post(`${BASE}/${id}/advice`, data);
export const markHelpful = (id, adviceId) =>
  axios.patch(`${BASE}/${id}/advice/${adviceId}/helpful`);
export const deleteProblem = (id) => axios.delete(`${BASE}/${id}`);
export const deleteAdvice = (id, adviceId) =>
  axios.delete(`${BASE}/${id}/advice/${adviceId}`);
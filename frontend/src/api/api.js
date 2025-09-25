import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL: `${API_BASE}/api`,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000
});

export const getServices = async () => {
  const res = await api.get('/services/');
  return res.data;
};

export const getCourses = async () => {
  const res = await api.get('/courses/');
  return res.data;
};

export const submitContact = async (contactData) => {
  const res = await api.post('/contact-form/', contactData);
  return res.data;
};

export default api;

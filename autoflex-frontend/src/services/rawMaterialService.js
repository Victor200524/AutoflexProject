import api from './api';

export const rawMaterialService = {
  
  getAll: async () => {
    const response = await api.get('/raw-materials');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/raw-materials', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/raw-materials/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/raw-materials/${id}`);
  }
};
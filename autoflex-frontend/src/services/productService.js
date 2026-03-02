import api from './api';

export const productService = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/products/${id}`);
  },

  calculate: async () => {
    const response = await api.get('/productions/calculate');
    return response.data;
  }
};
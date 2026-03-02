import api from './api';

export const productionService = {
  calculate: async () => {
    const response = await api.get('/productions/calculate');
    return response.data;
  },
  confirm: async () => {
    const response = await api.post('/productions/confirm');
    return response.data;
  }
};
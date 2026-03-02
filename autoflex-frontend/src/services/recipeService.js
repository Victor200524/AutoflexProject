import api from './api';

export const recipeService = {
  link: async (productId, rawMaterialId, quantityNeeded) => {
    const response = await api.post('/product-raw-materials', {
      productId: Number(productId),
      rawMaterialId: Number(rawMaterialId),
      quantityNeeded: Number(quantityNeeded) 
    });
    return response.data;
  }
};
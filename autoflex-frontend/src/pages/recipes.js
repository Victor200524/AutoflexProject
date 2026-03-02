import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { rawMaterialService } from '../services/rawMaterialService';
import { recipeService } from '../services/recipeService';

export default function Recipes() {
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pData, mData] = await Promise.all([
          productService.getAll(),
          rawMaterialService.getAll()
        ]);
        setProducts(pData);
        setMaterials(mData);
      } catch (e) { console.error("Error loading lists", e); }
    };
    loadData();
  }, []);

const handleLink = async (e) => {
    e.preventDefault();
    try {
      await recipeService.link(selectedProduct, selectedMaterial, quantity);
      alert("Recipe linked successfully!");
      setQuantity('');
    } catch (error) {
      alert("Error linking. Check the browser console for details.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Setup Product Recipe</h2>
      <form onSubmit={handleLink} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Finished Product</label>
          <select required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">Choose...</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Raw Material Needed</label>
          <select required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
            <option value="">Choose...</option>
            {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity per Unit</label>
          <input type="number" step="0.01" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g., 1.5" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition">
          Link Material
        </button>
      </form>
    </div>
  );
}
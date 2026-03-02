import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export default function Product() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setProductsList(data);
    } catch (error) {
      console.log("Error fetching data.", error);
      setProductsList([]); 
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault(); 
    
    const payload = {
      id: editingId ? editingId : 0,
      name: name,
      value: Number(value)
    };

    try {
      if (editingId) {
        await productService.update(editingId, payload);
      } else {
        await productService.create(payload);
      }
      
      resetForm();
      fetchProducts();
    } catch (error) {
      alert("Error saving product.");
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await productService.delete(id);
        fetchProducts(); 
      } catch (error) {
        alert("Error deleting.");
      }
    }
  };

  const editProduct = (item) => {
    setName(item.name);
    setValue(item.value);
    setEditingId(item.id);
  };

  const resetForm = () => {
    setName('');
    setValue('');
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editingId ? 'Edit Product' : 'Register New Product'}
        </h2>
        
        <form onSubmit={saveProduct} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Oversized T-Shirt"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700">Sale Value (R$)</label>
            <input 
              type="number" 
              required
              min="0"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.00"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <button 
            type="submit" 
            className={`${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-2 px-6 rounded-md transition`}
          >
            {editingId ? 'Update' : 'Save'}
          </button>

          {editingId && (
            <button 
              type="button" 
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Product Catalog</h2>
        
        {productsList.length === 0 ? (
          <p className="text-gray-500">No products registered yet.</p>
        ) : (
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4 text-gray-700">ID</th>
                <th className="py-3 px-4 text-gray-700">Name</th>
                <th className="py-3 px-4 text-gray-700">Value (R$)</th>
                <th className="py-3 px-4 text-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsList.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-500">#{item.id}</td>
                  <td className="py-2 px-4 font-medium text-gray-800">{item.name}</td>
                  <td className="py-2 px-4 text-gray-600">
                    R$ {item.value ? item.value.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-2 px-4 text-center space-x-4">
                    <button 
                      onClick={() => editProduct(item)}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
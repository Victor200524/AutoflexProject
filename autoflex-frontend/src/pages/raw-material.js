import { useState, useEffect } from 'react';
import { rawMaterialService } from '../services/rawMaterialService'; 

export default function RawMaterial() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [materialsList, setMaterialsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const data = await rawMaterialService.getAll(); 
      setMaterialsList(data);
    } catch (error) {
      console.log("Error fetching data.", error);
      setMaterialsList([]); 
    }
  };

  const saveMaterial = async (e) => {
    e.preventDefault(); 
    
    const payload = {
      name: name,
      stockQuantity: Number(quantity)
    };

    try {
      if (editingId) {
        await rawMaterialService.update(editingId, payload);
      } else {
        await rawMaterialService.create(payload);
      }
      
      resetForm();
      fetchMaterials();
    } catch (error) {
      alert("Error saving raw material.");
      console.error(error);
    }
  };

  const deleteMaterial = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await rawMaterialService.delete(id);
        fetchMaterials(); 
      } catch (error) {
        alert("Error deleting. It might be linked to a product!");
      }
    }
  };

  const editMaterial = (item) => {
    setName(item.name);
    setQuantity(item.stockQuantity);
    setEditingId(item.id);
  };

  const resetForm = () => {
    setName('');
    setQuantity('');
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editingId ? 'Edit Raw Material' : 'Register New Raw Material'}
        </h2>
        
        <form onSubmit={saveMaterial} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Material Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Cotton Fabric"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input 
              type="number" 
              required
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
        <h2 className="text-xl font-bold mb-4 text-gray-800">Current Inventory</h2>
        
        {materialsList.length === 0 ? (
          <p className="text-gray-500">No raw materials registered yet.</p>
        ) : (
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4 text-gray-700">ID</th>
                <th className="py-3 px-4 text-gray-700">Name</th>
                <th className="py-3 px-4 text-gray-700">Stock Quantity</th>
                <th className="py-3 px-4 text-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materialsList.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-500">#{item.id}</td>
                  <td className="py-2 px-4 font-medium text-gray-800">{item.name}</td>
                  <td className="py-2 px-4 text-gray-600">{item.stockQuantity}</td>
                  <td className="py-2 px-4 text-center space-x-4">
                    <button 
                      onClick={() => editMaterial(item)}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteMaterial(item.id)}
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
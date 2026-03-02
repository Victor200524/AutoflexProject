import { useState } from 'react';
import { productionService } from '../services/productionService';

export default function Dashboard() {
  const [productionData, setProductionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const data = await productionService.calculate();
      setProductionData(data);
    } catch (error) {
      alert("Error calculating production. Make sure recipes are set up!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!confirm("Are you sure you want to confirm this production? This will subtract items from your real stock.")) return;
    
    setLoading(true);
    try {
      await productionService.confirm();
      alert("Success! Stock has been updated.");
      setProductionData(null);
    } catch (error) {
      alert("Failed to update stock.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Production Dashboard</h1>
        <p className="text-gray-600">Analyze your inventory and optimize your manufacturing output.</p>
        
        <button 
          onClick={handleCalculate}
          disabled={loading}
          className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all ${
            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105'
          }`}
        >
          {loading ? 'Calculating...' : '🚀 Calculate Max Production'}
        </button>
        {productionData && (
          <button 
            onClick={handleConfirm}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            ✅ Confirm & Update Stock
          </button>
        )}
      </div>

      {productionData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-indigo-800 font-semibold uppercase text-sm">Estimated Revenue</h3>
            <p className="text-3xl font-black text-indigo-900">
              R$ {productionData?.totalRevenue?.toFixed(2) ?? '0.00'}
            </p>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-800 font-bold mb-4">Recommended Production Plan</h3>
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm uppercase">
                  <th className="pb-3">Product Name</th>
                  <th className="pb-3 text-center">Units to Produce</th>
                  <th className="pb-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(productionData?.items || []).map((item, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="py-3 font-medium">{item.productName}</td>
                    
                    <td className="py-3 text-center font-bold text-green-600">
                      {item.quantityToProduce} units
                    </td>
                    <td className="py-3 text-right">
                      R$ {(item.quantityToProduce * (item.unitValue ?? 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import api from '../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/production-logs')
      .then(res => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading history:", err);
        setLoading(false);
      });
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59);
    doc.text("Autoflex - Production History Report", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Report generated on: ${new Date().toLocaleString('pt-BR')}`, 14, 28);

    const columns = ["Date", "Product Name", "Quantity", "Total Revenue"];
    
    const rows = logs.map(log => [
      new Date(log.createdAt).toLocaleString('pt-BR'),
      log.productName,
      `${log.quantityProduced} units`,
      `R$ ${log.revenueGenerated.toFixed(2)}`
    ]);
    
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 35,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229], textColor: 255 },
      styles: { fontSize: 9 },
    });

    doc.save(`production_report_${new Date().getTime()}.pdf`);
  };

  if (loading) return <div className="p-10 text-center text-gray-500 font-medium">Loading history...</div>;

    const totalAccumulated = logs.reduce((acc, log) => acc + log.revenueGenerated, 0);
    const totalUnits = logs.reduce((acc, log) => acc + log.quantityProduced, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg">
            <p className="text-indigo-100 text-sm font-medium">Total Lifetime Revenue</p>
            <h2 className="text-3xl font-black">R$ {totalAccumulated.toFixed(2)}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg">
            <p className="text-gray-500 text-sm font-medium">Total Units Produced</p>
            <h2 className="text-3xl font-black text-gray-800">{totalUnits} units</h2>
        </div>
        </div>

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Production History</h1>
          <p className="text-gray-500 mt-1">Review your past manufacturing cycles and financial performance.</p>
        </div>
        
        <button 
          onClick={exportPDF}
          disabled={logs.length === 0}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          <span>📄</span> Export Report
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {new Date(log.createdAt).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {log.productName}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold">
                      {log.quantityProduced} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-green-600 font-black">
                    R$ {log.revenueGenerated.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                  No production logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
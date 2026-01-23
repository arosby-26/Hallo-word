#halloword okm organisasi krampo modrn
import React, { useState } from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { TransactionType, Transaction } from '../types';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Download,
  Plus,
  Trash2,
  X,
  CheckCircle,
  TrendingUp,
  PieChart as PieChartIcon
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const FinanceCard = ({ label, value, icon: Icon, color, subLabel }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
    </div>
    <h3 className="text-slate-500 font-medium text-sm">{label}</h3>
    <p className="text-2xl font-black text-slate-800 mt-1">Rp {value.toLocaleString('id-ID')}</p>
    {subLabel && <p className="text-xs text-slate-400 mt-2 font-medium">{subLabel}</p>}
  </div>
);

const Finance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCredit = transactions
    .filter(t => t.type === TransactionType.CREDIT)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalDebit = transactions
    .filter(t => t.type === TransactionType.DEBIT)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalCredit - totalDebit;

  const chartData = [
    { name: 'Pemasukan', value: totalCredit },
    { name: 'Pengeluaran', value: totalDebit },
  ];

  const COLORS = ['#4f46e5', '#f43f5e'];

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Manajemen Keuangan</h2>
          <p className="text-slate-500">Kelola arus kas dan anggaran organisasi secara transparan.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white text-slate-600 px-5 py-3 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Ekspor
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <Plus size={18} /> Transaksi Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FinanceCard label="Total Pemasukan" value={totalCredit} icon={ArrowUpRight} color="bg-emerald-500" subLabel="Total dana masuk terdaftar" />
          <FinanceCard label="Total Pengeluaran" value={totalDebit} icon={ArrowDownLeft} color="bg-rose-500" subLabel="Total dana keluar terdaftar" />
          <div className="md:col-span-2">
            <FinanceCard label="Saldo Organisasi (Balance)" value={balance} icon={Wallet} color="bg-indigo-600" subLabel="Estimasi dana bersih yang tersedia saat ini" />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center">
          <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2 w-full text-left">
            <PieChartIcon size={20} className="text-indigo-600" /> Rasio Kas
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div> Pemasukan
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div> Pengeluaran
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari transaksi berdasarkan nama atau kategori..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b text-[10px] uppercase text-slate-400 font-black tracking-[0.15em]">
              <tr>
                <th className="px-8 py-5">Tanggal</th>
                <th className="px-8 py-5">Deskripsi & Kategori</th>
                <th className="px-8 py-5">Jumlah Nominal</th>
                <th className="px-8 py-5 text-center">Tipe</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                    {t.date}
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-slate-800">{t.description}</p>
                    <span className="text-[10px] text-indigo-600 font-black uppercase tracking-wider">{t.category}</span>
                  </td>
                  <td className={`px-8 py-5 font-black ${t.type === TransactionType.CREDIT ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === TransactionType.CREDIT ? '+' : '-'} Rp {t.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        t.type === TransactionType.CREDIT ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {t.type === TransactionType.CREDIT ? 'Kredit' : 'Debit'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => setTransactions(transactions.filter(tr => tr.id !== t.id))}
                      className="p-2.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;

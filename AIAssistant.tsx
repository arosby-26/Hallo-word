#halloworld okm organisasi krampo modern
import React, { useState } from 'react';
import { Sparkles, Copy, RotateCcw, FileText, Megaphone, Wallet } from 'lucide-react';
import { generateAnnouncement, summarizeMeetingMinutes, analyzeFinancialStatus } from '../services/geminiService';
import { MOCK_TRANSACTIONS } from '../constants';
import { TransactionType } from '../types';

const AIAssistant: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'announcement' | 'summary' | 'finance'>('announcement');

  const handleGenerate = async () => {
    setLoading(true);
    let output = '';
    
    if (activeTab === 'announcement') {
      if (!topic) return;
      output = await generateAnnouncement(topic);
    } else if (activeTab === 'summary') {
      if (!notes) return;
      output = await summarizeMeetingMinutes(notes);
    } else if (activeTab === 'finance') {
      const totalCredit = MOCK_TRANSACTIONS.filter(t => t.type === TransactionType.CREDIT).reduce((a, b) => a + b.amount, 0);
      const totalDebit = MOCK_TRANSACTIONS.filter(t => t.type === TransactionType.DEBIT).reduce((a, b) => a + b.amount, 0);
      const balance = totalCredit - totalDebit;
      const summary = `Total Kredit: Rp ${totalCredit}, Total Debit: Rp ${totalDebit}, Saldo: Rp ${balance}. Kategori terlibat: ${[...new Set(MOCK_TRANSACTIONS.map(t => t.category))].join(', ')}`;
      output = await analyzeFinancialStatus(summary);
    }
    
    setResult(output);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('Tersalin ke papan klip!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-2xl shadow-lg mb-4">
          <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800">Kecerdasan OrgFlow</h2>
        <p className="text-slate-500">Pendamping organisasi bertenaga AI Anda.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button 
            onClick={() => { setActiveTab('announcement'); setResult(''); }}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-4 font-bold transition-colors ${activeTab === 'announcement' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Megaphone size={18} />
            Pengumuman
          </button>
          <button 
            onClick={() => { setActiveTab('summary'); setResult(''); }}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-4 font-bold transition-colors ${activeTab === 'summary' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <FileText size={18} />
            Notulensi
          </button>
          <button 
            onClick={() => { setActiveTab('finance'); setResult(''); }}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-4 font-bold transition-colors ${activeTab === 'finance' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Wallet size={18} />
            Analisis Keuangan
          </button>
        </div>

        <div className="p-8 space-y-6">
          {activeTab === 'announcement' && (
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Topik Pengumuman</label>
              <textarea 
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-600"
                placeholder="Contoh: Program keanggotaan baru, rapat tahunan..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          )}
          
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Catatan Rapat Kasar</label>
              <textarea 
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-600"
                placeholder="Tempel catatan rapat Anda di sini..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}

          {activeTab === 'finance' && (
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Wallet className="text-indigo-600" size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Mesin Wawasan Finansial</h4>
                <p className="text-sm text-slate-500 mt-1">AI akan menganalisis data keuangan saat ini dan memberikan strategi optimasi.</p>
              </div>
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={loading || (activeTab === 'announcement' && !topic) || (activeTab === 'summary' && !notes)}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'}`}
          >
            {loading ? <RotateCcw className="animate-spin" size={20} /> : <><Sparkles size={20} /> Analisis & Hasilkan</>}
          </button>

          {result && (
            <div className="mt-8 p-6 bg-slate-900 text-slate-100 rounded-2xl relative group animate-in zoom-in-95 duration-300">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-slate-300"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                {result.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

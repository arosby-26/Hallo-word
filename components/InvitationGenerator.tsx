
import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Printer, 
  RefreshCcw,
  CheckCircle,
  Clock,
  MapPin,
  Calendar
} from 'lucide-react';
import { generateInvitation } from '../services/geminiService';

const InvitationGenerator: React.FC = () => {
  const [details, setDetails] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    agenda: ''
  });
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!details.title || !details.date || !details.location) {
      alert("Mohon isi minimal Judul, Tanggal, dan Lokasi acara.");
      return;
    }
    setLoading(true);
    const result = await generateInvitation(details);
    setDraft(result);
    setLoading(false);
  };

  const copyDraft = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printDraft = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Cetak Surat Undangan - OKM</title>
            <style>
              body { font-family: serif; padding: 40px; line-height: 1.6; }
              .header { text-align: center; border-bottom: 2px solid black; padding-bottom: 10px; margin-bottom: 30px; }
              .content { white-space: pre-wrap; font-size: 12pt; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin:0;">ORG. KRAMPO MODERN (OKM)</h1>
              <p style="margin:0;">Kecerdasan Kolektif & Kemajuan Bersama</p>
            </div>
            <div class="content">${draft}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      {/* Kolom Kiri: Input */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="text-indigo-600" size={20} />
            Data Undangan
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Judul Acara</label>
              <input 
                type="text"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Contoh: Rapat Koordinasi Tahunan"
                value={details.title}
                onChange={(e) => setDetails({...details, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Calendar size={12} /> Tanggal
                </label>
                <input 
                  type="date"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={details.date}
                  onChange={(e) => setDetails({...details, date: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Clock size={12} /> Waktu
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="09:00 WIB"
                  value={details.time}
                  onChange={(e) => setDetails({...details, time: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                <MapPin size={12} /> Lokasi
              </label>
              <input 
                type="text"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Contoh: Aula Serbaguna Lantai 2"
                value={details.location}
                onChange={(e) => setDetails({...details, location: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Agenda Utama</label>
              <textarea 
                className="w-full h-24 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                placeholder="Sebutkan poin-poin agenda rapat..."
                value={details.agenda}
                onChange={(e) => setDetails({...details, agenda: e.target.value})}
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:bg-slate-300"
            >
              {loading ? <RefreshCcw className="animate-spin" size={20} /> : <><Sparkles size={20} /> Buat Draf Resmi AI</>}
            </button>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Preview */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 min-h-[600px] flex flex-col relative overflow-hidden group">
          {/* Paper Effect Decorations */}
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FileText className="text-indigo-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 leading-none">Pratinjau Surat</h4>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">KOP SURAT OKM</p>
              </div>
            </div>
            
            {draft && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={copyDraft}
                  className={`p-2 rounded-lg transition-all ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'}`}
                >
                  {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                </button>
                <button 
                  onClick={printDraft}
                  className="p-2 bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all"
                >
                  <Printer size={18} />
                </button>
              </div>
            )}
          </div>

          {!draft ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <FileText className="text-slate-200" size={40} />
              </div>
              <div>
                <p className="text-slate-400 font-medium">Belum ada draf surat.</p>
                <p className="text-xs text-slate-300">Isi formulir di sebelah kiri untuk menghasilkan surat resmi otomatis.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200 font-serif text-sm leading-relaxed text-slate-700 whitespace-pre-wrap overflow-y-auto max-h-[500px]">
              <div className="text-center mb-8 border-b border-slate-300 pb-4">
                <h2 className="text-lg font-bold text-slate-900 m-0">ORGANISASI KRAMPO MODERN (OKM)</h2>
                <p className="text-xs italic m-0">"Kecerdasan Kolektif & Kemajuan Bersama"</p>
                <p className="text-[10px] mt-1">Gedung Pusat OKM, Jakarta, Indonesia</p>
              </div>
              {draft}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>Dihasilkan secara otomatis oleh OKM Intelligence</span>
            <span>ID: DOC-{Math.floor(1000 + Math.random() * 9000)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationGenerator;

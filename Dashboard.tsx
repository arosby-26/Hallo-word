#okm org krampo modern
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  Wallet, 
  Megaphone, 
  ChevronRight, 
  Upload, 
  Share2, 
  ShieldCheck, 
  Zap,
  Clock,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Layout
} from 'lucide-react';
import { User, UserRole } from '../types';
import { getDailyInsight } from '../services/geminiService';

interface DashboardProps {
  user?: User;
}

const QuickAction = ({ icon: Icon, label, onClick, color }: any) => (
  <button 
    onClick={onClick}
    className="flex-1 min-w-[140px] bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all group text-left"
  >
    <div className={`p-3 w-fit rounded-2xl ${color} bg-opacity-10 text-slate-700 mb-4 group-hover:scale-110 transition-transform`}>
      <Icon size={22} className={color.replace('bg-', 'text-')} />
    </div>
    <div className="flex items-center justify-between">
      <span className="font-black text-slate-700 text-xs uppercase tracking-wider">{label}</span>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
    </div>
  </button>
);

const ActivityItem = ({ user, action, time, type }: any) => (
  <div className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
      type === 'upload' ? 'bg-emerald-50 text-emerald-600' :
      type === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
    }`}>
      {type === 'upload' ? <Upload size={20} /> : type === 'admin' ? <ShieldCheck size={20} /> : <Calendar size={20} />}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-slate-800 truncate">{user} <span className="font-medium text-slate-500">{action}</span></p>
      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <Clock size={12} /> {time}
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, trend }: any) => (
  <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 group hover:bg-white/10 transition-all duration-500">
    <div className="flex justify-between items-start">
      <p className="text-4xl font-black text-white group-hover:scale-110 transition-transform origin-left">{value}</p>
      {trend && <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{trend}</span>}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{label}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const isPengurus = user?.role === UserRole.PENGURUS;
  const [copied, setCopied] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [insightLoading, setInsightLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setInsightLoading(true);
      const insight = await getDailyInsight();
      setAiInsight(insight);
      setInsightLoading(false);
    };
    fetchInsight();
  }, []);

  const handleShareApp = () => {
    navigator.clipboard.writeText(window.location.origin + window.location.pathname);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-16">
      {/* AI Daily Insight Banner */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 p-4 opacity-10 group-hover:scale-150 group-hover:-rotate-12 transition-all duration-1000">
          <Sparkles size={240} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center shrink-0 backdrop-blur-xl border border-white/30 shadow-2xl group-hover:rotate-12 transition-transform duration-700">
            <Sparkles className="text-white fill-white animate-pulse" size={40} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200 mb-2">AI Organizational Insight</h4>
            {insightLoading ? (
              <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-100/60 italic text-lg">
                <RefreshCw size={20} className="animate-spin" /> Merangkai strategi untuk Anda...
              </div>
            ) : (
              <p className="text-xl md:text-2xl font-bold leading-relaxed tracking-tight italic">"{aiInsight}"</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Hero */}
          <div className="relative overflow-hidden bg-slate-950 rounded-[3rem] p-10 md:p-14 text-white shadow-[0_35px_60px_-15px_rgba(30,41,59,0.3)]">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
                    <TrendingUp size={14} /> OKM Dashboard v2.5
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter">
                    Kelola <br/> 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-500">Visi Tim.</span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Anggota Aktif" value="48" trend="+4" />
                  <StatCard label="Event Bulan Ini" value="05" />
                </div>
              </div>
              <div className="w-full md:w-auto grid grid-cols-1 gap-4 shrink-0">
                <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-900/40 text-center">
                  <p className="text-5xl font-black text-white">99%</p>
                  <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mt-2">Efisiensi Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <section>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <Layout size={18} className="text-indigo-600" /> Pusat Navigasi
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {isPengurus ? (
                <>
                  <QuickAction icon={Users} label="Anggota" color="bg-indigo-600" onClick={() => navigate('/members')} />
                  <QuickAction icon={CheckSquare} label="Tugas" color="bg-emerald-600" onClick={() => navigate('/tasks')} />
                  <QuickAction icon={Wallet} label="Keuangan" color="bg-amber-600" onClick={() => navigate('/finance')} />
                  <QuickAction icon={Calendar} label="Acara" color="bg-rose-600" onClick={() => navigate('/events')} />
                  <QuickAction icon={Megaphone} label="Warta" color="bg-blue-600" onClick={() => navigate('/announcements')} />
                  <QuickAction icon={ShieldCheck} label="Admin" color="bg-slate-800" onClick={() => navigate('/members')} />
                </>
              ) : (
                <>
                  <QuickAction icon={Upload} label="Unggah" color="bg-emerald-600" onClick={() => navigate('/upload')} />
                  <QuickAction icon={Megaphone} label="Berita" color="bg-blue-600" onClick={() => navigate('/announcements')} />
                  <QuickAction icon={Calendar} label="Agenda" color="bg-rose-600" onClick={() => navigate('/events')} />
                </>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Aktivitas Terbaru</h3>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
            <div className="space-y-1">
              <ActivityItem user="Budi Santoso" action="mengunggah foto rapat" time="5m lalu" type="upload" />
              <ActivityItem user="Admin" action="memperbarui agenda Juli" time="2j lalu" type="admin" />
              <ActivityItem user="Siti Aminah" action="mendaftarkan acara baru" time="Kemarin" type="event" />
              <ActivityItem user="Michael" action="mencatat iuran bulanan" time="Kemarin" type="admin" />
            </div>
            <button className="w-full mt-6 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all">
              Lihat Semua Log
            </button>
          </section>

          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all">
              <Share2 size={32} />
            </div>
            <h4 className="text-xl font-black text-slate-800">Ajak Tim Bergabung</h4>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed mb-8">
              Kolaborasi lebih mudah jika semua anggota terhubung di OKM.
            </p>
            <button 
              onClick={handleShareApp}
              className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl ${copied ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'}`}
            >
              {copied ? 'Berhasil Disalin!' : 'Salin Link Akses'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

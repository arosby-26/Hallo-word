
import React from 'react';
import { UserRole } from '../types';
import { ShieldCheck, Users, Info, ChevronRight, Zap } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const UltimateLogo = () => (
  <div className="relative flex items-center justify-center mb-12 group">
    {/* Core Aura */}
    <div className="absolute w-48 h-48 bg-indigo-500/30 rounded-full blur-[80px] animate-pulse"></div>
    <div className="absolute w-32 h-32 bg-violet-600/40 rounded-full blur-[40px] animate-pulse delay-500"></div>
    
    {/* Outer Orbit Ring 1 */}
    <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-56 h-56 opacity-20">
        <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.5" strokeDasharray="1 10" fill="none" />
      </svg>
    </div>

    {/* Outer Orbit Ring 2 */}
    <div className="absolute inset-0 animate-[spin_20s_linear_infinite_reverse]">
      <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-30">
        <circle cx="50" cy="50" r="40" stroke="url(#logoGrad)" strokeWidth="1" strokeDasharray="15 15" fill="none" />
      </svg>
    </div>

    {/* Central Icon Body */}
    <div className="relative z-10 w-32 h-32 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
      {/* 3D Glass Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-[3rem] border border-white/30 shadow-2xl rotate-45 group-hover:rotate-0 transition-all duration-700"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-[3rem] shadow-[0_0_50px_rgba(79,70,229,0.4)] -rotate-12 group-hover:rotate-0 transition-all duration-700"></div>
      
      {/* Central Symbol */}
      <div className="relative z-20 flex flex-col items-center text-white">
        <Zap size={44} className="fill-white animate-pulse" />
        <span className="text-xs font-black tracking-[0.3em] mt-1">MODERN</span>
      </div>
    </div>

    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </div>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-[#020617]">
      {/* High-End Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072")',
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
      
      {/* Interactive Floating Particles (CSS Only) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-20 delay-1000"></div>
      </div>

      <div className="relative z-20 w-full max-w-4xl flex flex-col items-center">
        {/* Centered Identity */}
        <div className="text-center mb-16 space-y-6">
          <UltimateLogo />
          <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-1000">
            <h1 className="text-7xl font-black text-white tracking-tighter">
              OKM<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-indigo-400 font-bold tracking-[0.4em] uppercase text-sm">Organisasi Krampo Modern</p>
          </div>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-in slide-in-from-bottom-12 duration-1000">
          <button 
            onClick={() => onLogin(UserRole.PENGURUS)}
            className="group relative bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-indigo-500/50 transition-all duration-500"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <ShieldCheck size={36} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white uppercase">Akses Pengurus</h3>
                <p className="text-slate-400 mt-2 text-sm px-4">Kontrol penuh database, keuangan, dan otomasi AI.</p>
              </div>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                Masuk Panel <ChevronRight size={16} />
              </div>
            </div>
          </button>

          <button 
            onClick={() => onLogin(UserRole.ANGGOTA)}
            className="group relative bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-emerald-500/50 transition-all duration-500"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Users size={36} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white uppercase">Ruang Anggota</h3>
                <p className="text-slate-400 mt-2 text-sm px-4">Lihat agenda, pengumuman, dan bagikan dokumentasi.</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                Masuk Ruang <ChevronRight size={16} />
              </div>
            </div>
          </button>
        </div>

        <div className="mt-20 flex items-center gap-4 text-slate-500 text-[10px] font-black tracking-widest uppercase opacity-40">
          <div className="h-px w-8 bg-slate-800"></div>
          Secured By OKM Protocol v2.1
          <div className="h-px w-8 bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Calendar, 
  Megaphone, 
  Sparkles,
  Menu,
  X,
  Search,
  Wallet,
  Upload,
  LogOut,
  Mail,
  HelpCircle
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import MemberList from './components/MemberList';
import TaskBoard from './components/TaskBoard';
import EventCalendar from './components/EventCalendar';
import Announcements from './components/Announcements';
import AIAssistant from './components/AIAssistant';
import Finance from './components/Finance';
import Login from './components/Login';
import MemberUpload from './components/MemberUpload';
import InvitationGenerator from './components/InvitationGenerator';
import HelpTutorial from './components/HelpTutorial';
import { UserRole, User } from './types';

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg' 
        : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Navbar = ({ onMenuClick, user, onLogout }: { onMenuClick: () => void, user: User | null, onLogout: () => void }) => {
  const location = useLocation();
  const getTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Beranda';
    if (path === '/members') return 'Anggota';
    if (path === '/tasks') return 'Daftar Tugas';
    if (path === '/events') return 'Kalender Acara';
    if (path === '/finance') return 'Keuangan';
    if (path === '/invitations') return 'Surat Undangan';
    if (path === '/announcements') return 'Pengumuman';
    if (path === '/ai-assistant') return 'Asisten AI';
    if (path === '/upload') return 'Unggah Konten';
    if (path === '/help') return 'Pusat Bantuan';
    return 'Org.Krampo Modern';
  };

  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-900">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{getTitle()}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">
          Status: <span className={user?.role === UserRole.PENGURUS ? 'text-indigo-600' : 'text-emerald-600'}>{user?.role}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 overflow-hidden shadow-sm">
            {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user?.name.charAt(0)}
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
            title="Keluar"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      role: role,
      name: role === UserRole.PENGURUS ? 'Admin Krampo' : 'Member Krampo',
      avatar: role === UserRole.PENGURUS ? 'https://picsum.photos/seed/admin/100' : 'https://picsum.photos/seed/member/100'
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const isPengurus = user.role === UserRole.PENGURUS;

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-50 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 w-64 bg-white border-r z-50 transition-transform duration-300 lg:translate-x-0 lg:static
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-16 flex items-center px-6 border-b justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600 px-2 py-1 rounded-lg shadow-sm">
                <span className="text-white font-black text-sm tracking-tighter">OKM</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800 whitespace-nowrap">Org.Krampo Modern</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col justify-between h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-4 space-y-2">
              <SidebarItem to="/" icon={LayoutDashboard} label="Beranda" active={window.location.hash === '#/' || window.location.hash === ''} />
              
              {isPengurus && (
                <>
                  <SidebarItem to="/members" icon={Users} label="Anggota" active={window.location.hash === '#/members'} />
                  <SidebarItem to="/tasks" icon={CheckSquare} label="Tugas" active={window.location.hash === '#/tasks'} />
                  <SidebarItem to="/events" icon={Calendar} label="Acara" active={window.location.hash === '#/events'} />
                  <SidebarItem to="/finance" icon={Wallet} label="Keuangan" active={window.location.hash === '#/finance'} />
                  <SidebarItem to="/invitations" icon={Mail} label="Surat Undangan" active={window.location.hash === '#/invitations'} />
                </>
              )}

              {!isPengurus && (
                <SidebarItem to="/upload" icon={Upload} label="Unggah Konten" active={window.location.hash === '#/upload'} />
              )}

              <SidebarItem to="/announcements" icon={Megaphone} label="Pengumuman" active={window.location.hash === '#/announcements'} />
              
              {isPengurus && (
                <>
                  <div className="pt-4 pb-2 px-4 uppercase text-xs font-semibold text-slate-400 tracking-wider">
                    Eksperimental
                  </div>
                  <SidebarItem to="/ai-assistant" icon={Sparkles} label="Asisten AI" active={window.location.hash === '#/ai-assistant'} />
                </>
              )}
            </div>

            <div className="p-4 border-t space-y-2">
              <SidebarItem to="/help" icon={HelpCircle} label="Pusat Bantuan" active={window.location.hash === '#/help'} />
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-700 mb-1">{isPengurus ? 'ADMIN MODE' : 'MEMBER MODE'}</p>
                <p className="text-[10px] text-indigo-600/80">
                  {isPengurus ? 'Akses penuh fitur pengurus.' : 'Berbagi momen terbaik organisasi.'}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(true)} user={user} onLogout={handleLogout} />
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              
              {isPengurus ? (
                <>
                  <Route path="/members" element={<MemberList />} />
                  <Route path="/tasks" element={<TaskBoard />} />
                  <Route path="/events" element={<EventCalendar />} />
                  <Route path="/finance" element={<Finance />} />
                  <Route path="/invitations" element={<InvitationGenerator />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/help" element={<HelpTutorial />} />
                  <Route path="/upload" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/upload" element={<MemberUpload />} />
                  <Route path="/help" element={<HelpTutorial />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;

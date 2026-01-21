
import React from 'react';
import { MOCK_ANNOUNCEMENTS } from '../constants';
import { User, Clock, MoreHorizontal, Bell } from 'lucide-react';

const Announcements: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pengumuman Terkini</h2>
          <p className="text-slate-500">Tetap terinformasi dengan berita terbaru dari organisasi.</p>
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_ANNOUNCEMENTS.map(item => (
          <article key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Bell size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-slate-600 leading-relaxed text-sm">
              {item.content}
            </div>
            <div className="mt-6 flex items-center gap-2">
              <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                Baca Selengkapnya
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Announcements;

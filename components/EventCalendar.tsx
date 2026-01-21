
import React from 'react';
import { MOCK_EVENTS } from '../constants';
import { MapPin, Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const EventCalendar: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Acara & Kegiatan</h2>
          <p className="text-slate-500">Rencanakan dan jadwalkan aktivitas organisasi Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-800">Juni 2024</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-500"><ChevronLeft size={20} /></button>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-500"><ChevronRight size={20} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day} className="bg-slate-50 py-3 text-center text-xs font-bold text-slate-400 uppercase">
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className={`bg-white h-24 p-2 relative hover:bg-indigo-50/50 transition-colors cursor-pointer group ${i + 1 === 10 || i + 1 === 25 ? 'bg-indigo-50/30' : ''}`}>
                  <span className={`text-sm font-medium ${i + 1 === 10 || i + 1 === 25 ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                    {i + 1}
                  </span>
                  {(i + 1 === 10 || i + 1 === 25) && (
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-indigo-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 px-1">Acara Mendatang</h3>
          <div className="space-y-4">
            {MOCK_EVENTS.map(event => (
              <div key={event.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-300 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-bold uppercase">{event.date.split('-')[1]}</span>
                    <span className="text-lg font-bold leading-none">{event.date.split('-')[2]}</span>
                  </div>
                  <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                    <CalendarIcon size={18} />
                  </button>
                </div>
                <h4 className="font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;

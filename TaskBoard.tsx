
import React from 'react';
import { MOCK_TASKS } from '../constants';
import { TaskStatus } from '../types';
import { Calendar, User, MoreHorizontal } from 'lucide-react';

const TaskCard = ({ task }: any) => {
  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return 'text-rose-600 bg-rose-50';
      case 'Medium': return 'text-amber-600 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const translatePriority = (p: string) => {
    switch (p) {
      case 'High': return 'Tinggi';
      case 'Medium': return 'Sedang';
      default: return 'Rendah';
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
          {translatePriority(task.priority)}
        </span>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={14} />
        </button>
      </div>
      <h4 className="font-bold text-slate-800 text-sm">{task.title}</h4>
      <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <User size={12} />
          <span>{task.assignee.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

const Column = ({ title, tasks }: any) => (
  <div className="flex-1 flex flex-col min-w-[300px] bg-slate-100/50 rounded-2xl p-4 border border-slate-200/50">
    <div className="flex items-center justify-between mb-4 px-2">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-slate-700">{title}</h3>
        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs font-bold">{tasks.length}</span>
      </div>
    </div>
    <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-300px)]">
      {tasks.map((task: any) => <TaskCard key={task.id} task={task} />)}
    </div>
  </div>
);

const TaskBoard: React.FC = () => {
  const todo = MOCK_TASKS.filter(t => t.status === TaskStatus.TODO);
  const inProgress = MOCK_TASKS.filter(t => t.status === TaskStatus.IN_PROGRESS);
  const done = MOCK_TASKS.filter(t => t.status === TaskStatus.DONE);

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Papan Tugas</h2>
          <p className="text-slate-500">Pantau dan kelola tugas-tugas organisasi.</p>
        </div>
      </div>
      
      <div className="flex flex-1 gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200">
        <Column title="Harus Dikerjakan" tasks={todo} />
        <Column title="Sedang Berlangsung" tasks={inProgress} />
        <Column title="Selesai" tasks={done} />
      </div>
    </div>
  );
};

export default TaskBoard;

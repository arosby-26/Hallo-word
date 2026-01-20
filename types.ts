
export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done'
}

export enum TransactionType {
  CREDIT = 'Credit', // Uang Masuk
  DEBIT = 'Debit'    // Uang Keluar
}

export enum UserRole {
  PENGURUS = 'Pengurus',
  ANGGOTA = 'Anggota'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Inactive';
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: TaskStatus;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  type?: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
}

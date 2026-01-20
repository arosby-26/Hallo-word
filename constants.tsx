
import { Member, Task, TaskStatus, Event, Announcement, Transaction, TransactionType } from './types';

export const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'John Doe', role: 'President', email: 'john@orgflow.com', avatar: 'https://picsum.photos/seed/john/100', status: 'Active' },
  { id: '2', name: 'Jane Smith', role: 'Vice President', email: 'jane@orgflow.com', avatar: 'https://picsum.photos/seed/jane/100', status: 'Active' },
  { id: '3', name: 'Michael Brown', role: 'Treasurer', email: 'michael@orgflow.com', avatar: 'https://picsum.photos/seed/michael/100', status: 'Active' },
  { id: '4', name: 'Sarah Wilson', role: 'Secretary', email: 'sarah@orgflow.com', avatar: 'https://picsum.photos/seed/sarah/100', status: 'Inactive' },
];

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Prepare Budget Report', assignee: 'Michael Brown', dueDate: '2024-06-15', status: TaskStatus.IN_PROGRESS, priority: 'High' },
  { id: '2', title: 'Plan Annual Meeting', assignee: 'Jane Smith', dueDate: '2024-07-01', status: TaskStatus.TODO, priority: 'Medium' },
  { id: '3', title: 'Update Member Directory', assignee: 'Sarah Wilson', dueDate: '2024-05-30', status: TaskStatus.DONE, priority: 'Low' },
];

export const MOCK_EVENTS: Event[] = [
  { id: '1', title: 'Monthly Strategy Meeting', date: '2024-06-10', time: '10:00 AM', location: 'Conference Hall A' },
  { id: '2', title: 'Charity Gala Night', date: '2024-06-25', time: '07:00 PM', location: 'Grand Ballroom' },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'New Office Policy', content: 'Please note the updated remote work guidelines starting next month.', author: 'John Doe', date: '2024-05-20' },
  { id: '2', title: 'Membership Drive Success', content: 'We have welcomed 50 new members this quarter! Great job team.', author: 'Jane Smith', date: '2024-05-18' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-01', description: 'Membership Fees Q2', category: 'Income', amount: 5000000, type: TransactionType.CREDIT },
  { id: '2', date: '2024-05-05', description: 'Office Rent May', category: 'Operational', amount: 2500000, type: TransactionType.DEBIT },
  { id: '3', date: '2024-05-10', description: 'Catering Strategy Meeting', category: 'Events', amount: 750000, type: TransactionType.DEBIT },
  { id: '4', date: '2024-05-15', description: 'Sponsorship - TechCorp', category: 'Sponsorship', amount: 3000000, type: TransactionType.CREDIT },
  { id: '5', date: '2024-05-20', description: 'Stationery & Printing', category: 'Operational', amount: 300000, type: TransactionType.DEBIT },
];

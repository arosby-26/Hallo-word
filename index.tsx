
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * DEKLARASI KHUSUS (Global Declaration)
 * Memastikan TypeScript mengenali variabel lingkungan process.env
 * dan properti global lainnya.
 */
declare global {
  interface Window {
    process: {
      env: {
        [key: string]: string | undefined;
      };
    };
  }
}

// Inisialisasi fallback process.env jika belum ada (untuk keamanan runtime)
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

const mountNode = document.getElementById('root');

if (!mountNode) {
  console.error("Fatal: Elemen root tidak ditemukan di DOM. Pastikan index.html memiliki <div id='root'></div>");
} else {
  const root = ReactDOM.createRoot(mountNode);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

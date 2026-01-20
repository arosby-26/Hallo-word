
import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Mail, 
  Wallet, 
  Upload, 
  Sparkles,
  ChevronRight,
  Info,
  Smartphone,
  Globe,
  Github,
  CloudLightning,
  MousePointer2
} from 'lucide-react';

const GuideCard = ({ icon: Icon, title, description, steps, colorClass = "bg-indigo-50 text-indigo-600" }: { icon: any, title: string, description: string, steps: string[], colorClass?: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      <div className={`p-2.5 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <h4 className="font-bold text-slate-800">{title}</h4>
    </div>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    <div className="space-y-2 pt-2">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-5 h-5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">{step}</p>
        </div>
      ))}
    </div>
  </div>
);

const HelpTutorial: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'admin' | 'member' | 'hosting'>('admin');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest">
          <BookOpen size={14} /> Pusat Bantuan & Tutorial
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800">Panduan Penggunaan OKM</h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Pilih kategori bantuan di bawah ini untuk melihat panduan langkah-demi-langkah.
        </p>
      </div>

      {/* Role Switcher */}
      <div className="flex flex-wrap p-1.5 bg-slate-100 rounded-2xl w-fit mx-auto gap-1">
        <button 
          onClick={() => setActiveRole('admin')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${activeRole === 'admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ShieldCheck size={18} /> Pengurus
        </button>
        <button 
          onClick={() => setActiveRole('member')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${activeRole === 'member' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Users size={18} /> Anggota
        </button>
        <button 
          onClick={() => setActiveRole('hosting')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${activeRole === 'hosting' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <CloudLightning size={18} /> Panduan Hosting (Admin)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeRole === 'admin' && (
          <>
            <GuideCard 
              icon={Users}
              title="Kelola Database Anggota"
              description="Pastikan semua data anggota tersimpan dengan rapi dan up-to-date."
              steps={[
                "Buka menu 'Anggota' di sidebar.",
                "Gunakan tombol 'Tambah Anggota' untuk memasukkan data baru.",
                "Anda bisa mencari anggota berdasarkan nama atau jabatan di kolom pencarian.",
                "Gunakan ikon tong sampah untuk menghapus anggota yang sudah tidak aktif."
              ]}
            />
            <GuideCard 
              icon={Mail}
              title="Membuat Surat Undangan"
              description="Gunakan kecerdasan buatan untuk merangkai surat undangan formal dalam hitungan detik."
              steps={[
                "Pilih menu 'Surat Undangan'.",
                "Isi detail acara (Judul, Tanggal, Lokasi, Agenda).",
                "Klik 'Buat Draf Resmi AI' dan tunggu asisten merangkai kata.",
                "Salin teks atau langsung klik ikon printer untuk mencetak ke PDF."
              ]}
            />
          </>
        )}

        {activeRole === 'member' && (
          <>
            <GuideCard 
              icon={Upload}
              title="Berbagi Momen Kegiatan"
              description="Bagikan foto atau video kegiatan agar semua anggota tahu perkembangan organisasi."
              steps={[
                "Klik menu 'Unggah Konten'.",
                "Pilih tipe konten (Berita, Gambar, atau Video).",
                "Tulis judul dan deskripsi yang menarik.",
                "Klik 'Kirim Sekarang'. Konten akan masuk ke antrean moderasi admin."
              ]}
            />
            <GuideCard 
              icon={Smartphone}
              title="Akses Lewat Handphone"
              description="Aplikasi ini didesain responsif untuk penggunaan di perangkat mobile."
              steps={[
                "Buka link aplikasi di browser handphone Anda.",
                "Gunakan ikon menu (tiga garis) di pojok kiri atas untuk membuka sidebar.",
                "Anda bisa menambahkan link ini ke Home Screen HP Anda untuk akses lebih cepat."
              ]}
            />
          </>
        )}

        {activeRole === 'hosting' && (
          <>
            <GuideCard 
              icon={Github}
              title="Cara Upload ke GitHub"
              colorClass="bg-slate-900 text-white"
              description="GitHub digunakan untuk menyimpan kode dan mengaktifkan link website."
              steps={[
                "Buat akun di github.com, lalu buat 'New Repository' bernama 'okm-app'.",
                "Klik link 'uploading an existing file' di halaman utama repo baru tersebut.",
                "Buka folder aplikasi di komputer, pilih SEMUA file (Ctrl+A / Cmd+A).",
                "Tarik (Drag) semua file tersebut dan lepas (Drop) di area abu-abu GitHub.",
                "Klik tombol hijau 'Commit changes' di bagian bawah."
              ]}
            />
            <GuideCard 
              icon={MousePointer2}
              title="Tips Drag & Drop"
              colorClass="bg-blue-50 text-blue-600"
              description="Lakukan ini agar proses upload berjalan lancar dan tidak salah folder."
              steps={[
                "Pastikan browser GitHub dan Folder Komputer terbuka berdampingan.",
                "Tarik file LANGSUNG, bukan menarik folder induknya saja.",
                "Pastikan file 'index.html' berada di level paling atas (root), bukan di dalam folder lain.",
                "Jika file banyak, tunggu sampai semua progress bar berubah menjadi daftar teks."
              ]}
            />
            <GuideCard 
              icon={CloudLightning}
              title="Mengaktifkan Website"
              colorClass="bg-amber-50 text-amber-600"
              description="Ubah kode menjadi link yang bisa dibuka siapa saja."
              steps={[
                "Di GitHub, masuk ke menu 'Settings' -> 'Pages'.",
                "Pilih Branch 'main' and folder '/(root)', lalu klik Save.",
                "Tunggu 1 menit, link Anda akan muncul (misal: username.github.io/okm-app).",
                "Selesai! Link tersebut sekarang bisa dibagikan ke grup WhatsApp."
              ]}
            />
            <div className="bg-blue-600 rounded-3xl p-6 text-white flex flex-col justify-center">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Info size={20} /> Catatan Penting</h4>
              <p className="text-sm opacity-90 leading-relaxed">
                Aplikasi ini memerlukan API Key Gemini untuk fitur AI. Jika Anda menggunakan GitHub Pages, API Key harus dikonfigurasi dengan benar di dalam file kode. Untuk keamanan maksimal, disarankan menggunakan <strong>Vercel</strong> karena mendukung Environment Variables.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-3xl -mr-20 -mt-20 rounded-full"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Masih bingung dengan proses upload?</h3>
            <p className="text-slate-400 text-sm">Tim IT kami siap membantu Anda melakukan konfigurasi server pertama kali.</p>
          </div>
          <a 
            href="https://wa.me/your-number" 
            target="_blank" 
            className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-all shrink-0 shadow-lg"
          >
            Hubungi IT Support <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpTutorial;

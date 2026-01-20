
import React, { useState } from 'react';
import { Camera, Film, FileText, Send, Image as ImageIcon, Video, X } from 'lucide-react';

const MemberUpload: React.FC = () => {
  const [type, setType] = useState<'text' | 'image' | 'video'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate upload
    setTimeout(() => {
      alert('Konten berhasil diunggah dan sedang menunggu moderasi!');
      setTitle('');
      setContent('');
      setMediaPreview(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-800">Unggah Konten</h2>
        <p className="text-slate-500">Bagikan berita dan momen terbaru Anda dengan organisasi.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="flex border-b">
          <button 
            onClick={() => setType('text')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition-colors ${type === 'text' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-400'}`}
          >
            <FileText size={18} /> Berita
          </button>
          <button 
            onClick={() => setType('image')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition-colors ${type === 'image' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-400'}`}
          >
            <ImageIcon size={18} /> Gambar
          </button>
          <button 
            onClick={() => setType('video')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition-colors ${type === 'video' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-400'}`}
          >
            <Video size={18} /> Video
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Judul Konten</label>
            <input 
              required
              type="text"
              placeholder="Masukkan judul yang menarik..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Deskripsi / Isi Berita</label>
            <textarea 
              required
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              placeholder="Ceritakan detail kegiatan atau berita Anda..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {(type === 'image' || type === 'video') && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                {type === 'image' ? 'Unggah Foto' : 'Unggah Video'}
              </label>
              
              {!mediaPreview ? (
                <div className="relative h-48 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept={type === 'image' ? 'image/*' : 'video/*'}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="p-4 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {type === 'image' ? <Camera size={32} /> : <Film size={32} />}
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-500">Klik atau seret file ke sini</p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-black h-64">
                  <button 
                    onClick={() => setMediaPreview(null)}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  {type === 'image' ? (
                    <img src={mediaPreview} className="w-full h-full object-contain" alt="Preview" />
                  ) : (
                    <video src={mediaPreview} className="w-full h-full object-contain" controls />
                  )}
                </div>
              )}
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${isSubmitting ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'}`}
          >
            {isSubmitting ? 'Mengunggah...' : <><Send size={20} /> Kirim Sekarang</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberUpload;

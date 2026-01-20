
import { GoogleGenAI } from "@google/genai";

/**
 * Pengambilan API KEY dari variabel lingkungan.
 */
const API_KEY = process.env.API_KEY;

// Fungsi helper untuk inisialisasi AI dengan pengecekan
const getAIClient = () => {
  if (!API_KEY) {
    console.warn("Peringatan: API_KEY tidak ditemukan di environment. Fitur AI mungkin terbatas.");
    return null;
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const getDailyInsight = async () => {
  const ai = getAIClient();
  if (!ai) return "Pastikan koneksi internet stabil untuk mendapatkan tips harian.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Berikan satu tips singkat, inspiratif, dan praktis dalam Bahasa Indonesia untuk mengelola organisasi modern agar lebih solid dan produktif. Maksimal 2 kalimat.",
    });
    return response.text || "Tetap solid dan kolaboratif untuk mencapai visi bersama.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Fokus pada komunikasi terbuka adalah kunci keberhasilan tim.";
  }
};

export const generateAnnouncement = async (topic: string) => {
  const ai = getAIClient();
  if (!ai) return "Gagal memuat asisten AI. Silakan periksa konfigurasi.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a professional organization announcement about: ${topic}. Keep it concise, engaging, and professional. Use a standard structure with a heading.`,
    });
    return response.text || "Failed to generate announcement.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again later.";
  }
};

export const generateInvitation = async (details: { title: string, date: string, time: string, location: string, agenda: string }) => {
  const ai = getAIClient();
  if (!ai) return "Gagal memuat mesin pembuat surat.";

  try {
    const prompt = `Buatkan surat undangan resmi organisasi dalam Bahasa Indonesia yang formal dan sangat rapi. 
    Detail Acara:
    - Nama Acara: ${details.title}
    - Tanggal: ${details.date}
    - Waktu: ${details.time}
    - Lokasi: ${details.location}
    - Agenda Utama: ${details.agenda}
    
    Format harus mencakup: Salam pembuka formal, maksud undangan, detail acara dalam bentuk poin, salam penutup, dan tempat tanda tangan pengurus (Ketua & Sekretaris). Nama Organisasi: Org. Krampo Modern (OKM).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Gagal membuat draf surat.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten AI.";
  }
};

export const summarizeMeetingMinutes = async (rawNotes: string) => {
  const ai = getAIClient();
  if (!ai) return "Gagal merangkum. Periksa koneksi AI.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize these meeting notes into key decisions and action items: ${rawNotes}`,
    });
    return response.text || "Failed to summarize notes.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error summarizing content.";
  }
};

export const analyzeFinancialStatus = async (summary: string) => {
  const ai = getAIClient();
  if (!ai) return "Gagal menganalisis keuangan.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a financial analyst for an organization. Analyze this financial summary (Total Credit, Total Debit, Balance) and provide 3 key insights or suggestions for budget optimization: ${summary}`,
    });
    return response.text || "Failed to analyze finances.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error analyzing financial data.";
  }
};

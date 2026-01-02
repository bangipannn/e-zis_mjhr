# Sistem Internal Transaksi Zakat - Masjid Jami' Hidayaturrahmah

Aplikasi manajemen transaksi zakat internal yang dibangun dengan Next.js 15, TypeScript, Prisma ORM, dan Supabase (PostgreSQL).

## ✨ Fitur Utama

- 📊 Dashboard Analytics dengan grafik tren 7 hari
- 💰 Manajemen Transaksi (Fitrah Uang, Fitrah Beras, Zakat Mal)
- 📜 Riwayat Transaksi dengan search, filter, dan pagination
- 🎨 UI Premium dengan Emerald-Gold theme
- 🖨️ Receipt Generation siap cetak
- 📱 Responsive Design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan database credentials Anda

# Generate Prisma Client
npx prisma generate

# Run development server
npm run dev
```

## 🔧 Environment Variables

Lihat `.env.example` untuk template. Anda membutuhkan:
- Database URL dari Supabase
- Supabase API keys

## 🚢 Deploy ke Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Tambahkan environment variables di Vercel Dashboard.

## 📝 Tech Stack

Next.js 15 • TypeScript • Prisma • Supabase • Tailwind CSS • Recharts

---

**© 2026 | IRMASHID - Masjid Jami' Hidayaturrahmah**

<div align="center">
  <img src="public/logo_irmashid.png" alt="ZIS MJHR Logo" width="120" height="120" />
  
  # ZIS MJHR
  ### Sistem Manajemen Transaksi Zakat, Infaq, & Shadaqah
  **Masjid Jami' Hidayaturrahmah**

  [![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 📖 Tentang Projek

**ZIS MJHR** adalah aplikasi internal yang dirancang khusus untuk mempermudah pengelolaan data keuangan di **Masjid Jami' Hidayaturrahmah**. Fokus utama aplikasi ini adalah pencatatan transaksi Zakat Fitrah (Uang & Beras), Zakat Mal, serta Infaq/Shadaqah secara efisien, transparan, dan akuntabel.

Dibangun dengan arsitektur modern menggunakan **Next.js 15**, aplikasi ini menawarkan performa tinggi, keamanan data melalui **Supabase PostgreSQL**, dan antarmuka pengguna yang premium dan responsif.

---

## ✨ Fitur Unggulan

- � **Dashboard Analytics:** Visualisasi data real-time dengan grafik tren 7 hari terakhir menggunakan Recharts.
- 💰 **Manajemen Transaksi:** Input data zakat fitrah (uang/beras), zakat mal, dan infaq secara individual maupun grup (*bulk input*).
- 📜 **Riwayat Komprehensif:** Daftar transaksi yang dapat dicari, difilter berdasarkan tanggal, dan memiliki fitur navigasi halaman (*pagination*).
- 🖨️ **Digital Receipt:** Fitur cetak struk otomatis langsung dari aplikasi dengan tata letak yang profesional dan siap cetak.
- �️ **Clean Code & Singleton Pattern:** Struktur kode yang rapi dengan penerapan *Singleton* pada Prisma Client untuk mengoptimalkan koneksi database.
- 🇮🇩 **Full Documentation:** Seluruh komentar kode dan dokumentasi teknis tersedia dalam Bahasa Indonesia.

---

## �️ Tech Stack

- **Frontend:** [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Backend:** [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database Engine:** [PostgreSQL (Supabase)](https://supabase.com/)
- **Icons & UI:** [Lucide React](https://lucide.dev/), [Radix UI](https://www.radix-ui.com/)
- **Charts:** [Recharts](https://recharts.org/)

---

## 🚀 Persiapan Lokal

Ikuti langkah-langkah berikut untuk menjalankan projek di komputer lokal Anda:

### 1. Klon Repositori
```bash
git clone https://github.com/bangipannn/e-zis_mjhr.git
cd e-zis_mjhr
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env` dan lengkapi kredensial database Anda:
```bash
cp .env.example .env
```

Isi variabel berikut di dalam `.env`:
```env
DATABASE_URL="postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[ANON_KEY]"
```

### 4. Persiapan Database
Generate Prisma Client dan sinkronkan skema database:
```bash
npx prisma generate
```

### 5. Jalankan Aplikasi
```bash
npm run dev
```
Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

---

## 🚢 Deployment

Projek ini dikonfigurasi untuk deployment mudah di [Vercel](https://vercel.com/):

1. Hubungkan repositori GitHub Anda ke Vercel.
2. Tambahkan keempat **Environment Variables** di atas pada tab Settings di dashboard Vercel.
3. Klik **Redeploy**.
4. Selesai! Aplikasi Anda siap diakses secara publik.

---

## 📝 Catatan Penting
- Pastikan **Row Level Security (RLS)** pada tabel `Transaction` di Supabase sudah dikonfigurasi dengan benar atau dinonaktifkan untuk izin akses aplikasi.
- Gunakan region `ap-south-1` jika Anda menggunakan database Supabase yang sama dengan yang sudah dikonfigurasi.

---

<div align="center">
  <p>© 2026 | <b>IRMASHID</b> - Masjid Jami' Hidayaturrahmah</p>
  <p><i>Building with Heart for the Ummah.</i></p>
</div>

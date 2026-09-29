# Library Loan REST API

REST API sederhana untuk layanan pencatatan peminjaman buku perpustakaan. Proyek ini dibuat menggunakan Node.js, Express.js, dan Supabase sebagai database. API menyediakan operasi CRUD serta filter data berdasarkan status peminjaman dan dapat di-deploy menggunakan Vercel.

## 1. Tujuan

Proyek ini bertujuan menerapkan konsep REST API untuk mengelola data peminjaman buku secara terstruktur. Pengguna dapat melihat, menambahkan, mengubah, menghapus, dan memfilter data peminjaman melalui endpoint HTTP.

## 2. Teknologi

- Node.js
- Express.js
- Supabase (PostgreSQL)
- Vercel
- GitHub

## 3. Struktur Data

Tabel: `loans`

| Field | Tipe | Keterangan |
|---|---|---|
| id | bigint | Primary key dan ID peminjaman |
| member_name | varchar | Nama anggota |
| book_title | varchar | Judul buku |
| borrow_date | date | Tanggal peminjaman |
| due_date | date | Batas pengembalian |
| return_date | date | Tanggal pengembalian, boleh kosong |
| status | varchar | Dipinjam, Dikembalikan, atau Terlambat |
| created_at | timestamptz | Waktu data dibuat |

## 4. Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Menampilkan informasi API |
| GET | `/loans` | Mengambil seluruh data |
| GET | `/loans/:id` | Mengambil satu data berdasarkan ID |
| GET | `/loans?status=Terlambat` | Filter berdasarkan status |
| POST | `/loans` | Menambahkan data |
| PUT | `/loans/:id` | Mengubah data |
| DELETE | `/loans/:id` | Menghapus data |

## 5. Contoh Request dan Response

### GET /loans

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "member_name": "Andi Saputra",
      "book_title": "Pemrograman JavaScript",
      "borrow_date": "2026-09-20",
      "due_date": "2026-09-27",
      "return_date": null,
      "status": "Terlambat"
    }
  ]
}
```

### GET /loans?status=Terlambat

Endpoint tersebut hanya mengembalikan data dengan nilai `status` yang sesuai.

### POST /loans

Request body:

```json
{
  "member_name": "Dina Putri",
  "book_title": "Basis Data",
  "borrow_date": "2026-09-29",
  "due_date": "2026-10-06",
  "return_date": null,
  "status": "Dipinjam"
}
```

Response:

```json
{
  "success": true,
  "message": "Data peminjaman berhasil ditambahkan",
  "data": {
    "id": 4,
    "member_name": "Dina Putri",
    "book_title": "Basis Data",
    "borrow_date": "2026-09-29",
    "due_date": "2026-10-06",
    "return_date": null,
    "status": "Dipinjam"
  }
}
```

### PUT /loans/4

Request body:

```json
{
  "member_name": "Dina Putri",
  "book_title": "Basis Data",
  "borrow_date": "2026-09-29",
  "due_date": "2026-10-06",
  "return_date": "2026-10-04",
  "status": "Dikembalikan"
}
```

### DELETE /loans/4

Response:

```json
{
  "success": true,
  "message": "Data peminjaman berhasil dihapus",
  "data": {
    "id": 4
  }
}
```

## 6. Instalasi Lokal

### Clone repository

```bash
git clone https://github.com/aliftekkom24/library-loan-api.git
cd library-loan-api
```

### Install dependency

```bash
npm install
```

### Konfigurasi environment

Buat file `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key
```

Jangan mengunggah file `.env` ke GitHub.

### Membuat tabel Supabase

Buka Supabase SQL Editor, kemudian jalankan isi file `supabase.sql`.

### Menjalankan server

```bash
npm start
```

Server lokal berjalan pada:

```text
http://localhost:3000
```

## 7. Pengujian

Endpoint dapat diuji menggunakan browser untuk GET dan Postman/Thunder Client untuk seluruh operasi CRUD.

Contoh:

```text
GET http://localhost:3000/loans
GET http://localhost:3000/loans?status=Terlambat
GET http://localhost:3000/loans/1
```

Untuk POST, PUT, dan DELETE gunakan Postman atau Thunder Client.

## 8. Deployment Vercel

1. Push project ke GitHub.
2. Import repository ke Vercel.
3. Tambahkan Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
4. Deploy project.
5. Uji Base URL Vercel.

Contoh:

```text
https://library-loan-api.vercel.app
```

Ganti URL tersebut dengan URL deployment yang diberikan Vercel.

## 9. Link

GitHub Repository:

`https://github.com/aliftekkom24/library-loan-api`

Vercel Deployment:

`https://library-loan-api.vercel.app`

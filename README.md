# 🍽️ POS Restaurant — Next.js App

A simple yet powerful **Point of Sale (POS)** web application for restaurants, built with **Next.js**, **TypeScript**, **Prisma**, and **Cloudinary** for image uploads.

---

## 🚀 Features

- ✅ **Product & Category Management** – Create and list products and categories.
- 📷 **Image Uploads** – Handled via API route using **Cloudinary**.  
  → [`POST`](src/app/api/upload-image/route.ts)
- 🧾 **Client-side Forms** – Built with `react-hook-form` and validated with `zod`.
- 🧩 **Reusable UI Components**:
  - [`Input`](src/components/ui/input.tsx)
  - [`AddProductModal`](src/app/_components/shared/AddProductModal/AddProductModal.tsx)
  - [`AddCategoryModal`](src/app/_components/shared/AddCategoryModal/AddCategoryModal.tsx)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/docs/app)
- **Language**: TypeScript
- **Database**: Prisma ORM with PostgreSQL / SQLite  
  → [`prisma/schema.prisma`](prisma/schema.prisma)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Styling**: Tailwind CSS + PostCSS
- **Forms**: React Hook Form + Zod

---

## ⚙️ Setup & Installation

### Environment Variables

Create a `.env.local` file with:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URL="postgresql://user:pass@host:port/db?schema=public"
```

### Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Setup database**:
```bash
npx prisma generate
npx prisma db push
```

3. **Start development server**:
```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build



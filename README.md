# 🍽️ CodeMenu - Digital Menu PWA

Modern digital menu PWA (Progressive Web App) for restaurants with public menu viewing and admin panel for content management.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Ready-green?logo=supabase)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

### 🌐 Public Menu
- **Landing page** with all menu categories
- **Category pages** displaying products with images and prices
- **Bilingual support** (Spanish/English) with next-intl
- **PWA capabilities** - Install as app, offline support
- **Mobile-first design** - Optimized for smartphones and tablets
- **Responsive images** with automatic fallback for broken URLs

### 🔐 Admin Panel
- **Authentication** with Supabase Auth (email/password)
- **Categories CRUD** - Create, edit, delete, restore
- **Products CRUD** - Full product management
- **Image upload** to Supabase Storage
- **Search & Filters** - Find products/categories quickly
- **Soft delete** - Items can be restored after deletion
- **Dual pricing** - Support for glass/bottle pricing
- **Sort order** - Custom ordering of items

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router, React Server Components) |
| **Language** | TypeScript (strict mode) |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **Styling** | Tailwind CSS v4 + shadcn/ui components |
| **i18n** | next-intl (Spanish/English) |
| **PWA** | next-pwa with offline caching |
| **Deployment** | Vercel-ready |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn
- Supabase account (free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/codemenu.git
cd codemenu
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file (see `.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Set Up Supabase

#### Database Schema

Run the SQL from `supabase/schema.sql` in your Supabase SQL Editor to create:
- `categories` table
- `products` table
- Row Level Security (RLS) policies

See `SUPABASE_SETUP.md` for detailed instructions.

#### Storage Bucket

Create a public bucket named `product-images` for product photos.

See `SUPABASE_STORAGE_SETUP.md` for setup guide.

#### Create Admin User

In Supabase Dashboard → Authentication → Users → Add user:
```
Email: admin@example.com
Password: [your-secure-password]
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the public menu.

Admin panel: [http://localhost:3000/login](http://localhost:3000/login)

---

## 📁 Project Structure

```
codemenu/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Internationalized routes
│   │   │   ├── (public)/       # Public menu pages
│   │   │   │   ├── page.tsx           # Landing/categories
│   │   │   │   └── menu/[category]/   # Products by category
│   │   │   └── (admin)/        # Protected admin routes
│   │   │       ├── login/             # Admin authentication
│   │   │       └── dashboard/         # Admin CRUD pages
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── menu/               # Public menu components
│   │   └── admin/              # Admin panel components
│   ├── lib/
│   │   ├── supabase/           # Supabase clients & utilities
│   │   ├── i18n/               # Internationalization config
│   │   └── utils.ts
│   ├── types/
│   │   └── database.ts         # TypeScript types from Supabase
│   └── proxy.ts                # Next.js 16 middleware
├── messages/                   # i18n translations (es.json, en.json)
├── supabase/                   # Database schema & seed data
├── public/                     # Static assets
└── [config files]
```

---

## 🎨 Design System

### Brand Colors
- **Primary**: Navy blue `#1a1a2e`
- **Accent**: Gold `#c9a227`
- **Background**: Light variations

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
All UI components from shadcn/ui, fully customizable for your brand.

---

## 📱 PWA Features

- ✅ **Installable** - Add to home screen on mobile
- ✅ **Offline support** - Service worker caching
- ✅ **Fast loading** - Next.js + Turbopack
- ✅ **Responsive** - Works on all screen sizes

---

## 🔒 Security

- **Row Level Security (RLS)** - Public users can only read active items
- **Authenticated admin** - Full CRUD access requires login
- **Environment variables** - Secrets not committed to Git
- **Soft deletes** - Data never permanently removed from DB

---

## 🌍 Internationalization

Supports Spanish (default) and English:

- Routes: `/es/...` or `/en/...`
- Dynamic locale switching with next-intl
- All content (categories, products) has `_es` and `_en` fields

---

## 📝 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub ✅ (already done)
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables from `.env.local`
4. Deploy!

Vercel automatically detects Next.js and configures everything.

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Cloudflare Pages
- Railway
- Render

---

## 📚 Documentation

- `CLAUDE.md` - Project overview and code conventions
- `PROJECT_STRUCTURE.md` - Detailed file structure
- `SUPABASE_SETUP.md` - Database setup guide
- `SUPABASE_STORAGE_SETUP.md` - Image storage configuration

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Supabase** - Backend as a service
- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS
- **Vercel** - Hosting platform

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

## 💙 Credits

Developed by **[Vorluno](https://vorluno.dev)**

<p align="center">
  🤖 Built with <a href="https://claude.com/claude-code">Claude Code</a>
</p>

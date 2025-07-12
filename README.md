# 🛰️ Device Monitor Web App

Aplikacija za praćenje i upravljanje uređajima (radari, semafori, senzori itd.), kreirana kao testni projekat za poziciju web developera.

---

## 📦 Tehnologije

- **Frontend:** React + Vite, Tailwind CSS, Zustand, React Query, Recharts, Shadcn, Lucide React, Papaparse, React-Router-dom, React-hook-form, Sonner
- **Backend:** Node.js, Express, Prisma (ORM), cors, dotenv, jsonwebtoken, bcrypt, cookie-parser
- **Baza:** MySQL
- **Autentifikacija:** JWT + cookies

---

## ⚙️ Instalacija i pokretanje

### 1. Kloniraj projekat

```bash
git clone https://github.com/LukaStojkovic/projekat-dmv.git
cd projekat-dmv

cd ./backend/
npm i
Kreiraj .env file:

PORT=8000
JWT_SECRET=your_super_secret_jwt_key
DATABASE_URL=mysql://user:password@localhost:3306/ime_baze

-----------

Pokreni prisma migraciju:
npx prisma migrate dev --name init

-----------

Pokreni seed za podatke:
node ./libs/seed.js

-----------

Pokreni server: npm run dev

-----------

Frontend pokrentanje:
cd ../frontend
npm i
npm run dev

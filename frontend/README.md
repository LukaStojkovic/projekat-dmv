# DMV Projekat (Luka Stojkovic)

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

```

### 2. Kreiraj .env file

```bash


PORT=8000
JWT_SECRET=your_super_secret_jwt_key
DATABASE_URL=mysql://user:password@localhost:3306/ime_baze

```

### 3. Pokreni prisma migraciju

```bash

npx prisma migrate dev --name init

```

### 4. Pokreni seed za podatke

```bash
node ./libs/seed.js

```

### 5. Pokreni server

```bash
npm run dev

```

### 6. Frontend pokretanje

```bash
cd ../frontend
npm i
npm run dev
```

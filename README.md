# DevGenesis

DevGenesis, yazılım geliştiricilerin oyuncak script'lerden üretim seviyesinde
sistemlere geçmesini sağlayan **9 Sütunlu Mimari Karar Motoru**'dur. Platform,
her proje için mimari bağlamı, teknoloji ve AI iş bölümünü, anti-pattern'leri,
Genesis meta-prompt'u, kabul kriterlerini ve mülakat savunmasını tek bir
teknik spesifikasyonda toplar.

## Teknoloji yığını

- **Backend:** FastAPI, Python, async SQLAlchemy 2.0, asyncpg
- **Veritabanı:** PostgreSQL ve JSONB tabanlı proje alanları
- **Frontend:** Next.js 14 App Router, React, TypeScript, Tailwind CSS
- **API:** `/api/v1` altında FastAPI uç noktaları

## Klasör mimarisi

```text
devgenesis/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI route'ları
│   │   ├── core/         # Ayarlar, SQLAlchemy engine ve DB session
│   │   ├── crud/         # Veritabanı erişim işlemleri
│   │   ├── models/       # SQLAlchemy modelleri
│   │   ├── schemas/      # Pydantic istek/yanıt şemaları
│   │   ├── main.py       # FastAPI uygulama giriş noktası
│   │   └── seed.py       # JSON projelerini PostgreSQL'e aktarır
│   ├── data/projects/    # Seed için proje JSON dosyaları
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js App Router sayfaları ve layout
│   │   ├── components/   # Paylaşılan React bileşenleri
│   │   ├── lib/          # API istemcisi
│   │   └── types/        # TypeScript domain tipleri
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Gereksinimler

Başlamadan önce aşağıdakilerin kurulu olduğundan emin olun:

- Python 3.11 veya üzeri
- Node.js 18.17 veya üzeri ve npm
- PostgreSQL 14 veya üzeri

PostgreSQL içinde `devgenesis` adında bir veritabanı oluşturun. Varsayılan
geliştirme bağlantısı `postgres` kullanıcısı ve `postgres` şifresini kullanır.
Farklı bilgiler kullanıyorsanız `backend/.env` içindeki `DATABASE_URL` değerini
güncelleyin.

## Windows PowerShell ile kurulum

### 1. Projeyi klonlayın

```powershell
git clone <REPOSITORY_URL> devgenesis
Set-Location .\devgenesis
```

### 2. Backend ortamını hazırlayın

```powershell
Set-Location .\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
```

PowerShell betik çalıştırma politikası sanal ortamı etkinleştirmeyi
engelliyorsa, yalnızca mevcut terminal için şu komutu çalıştırın:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

### 3. Veritabanını tohumlayın ve API'yi çalıştırın

PostgreSQL çalışırken backend klasöründe:

```powershell
python -m app.seed
uvicorn app.main:app --reload
```

API varsayılan olarak `http://127.0.0.1:8000` adresinde çalışır. OpenAPI
belgelerine `http://127.0.0.1:8000/docs` üzerinden ulaşabilirsiniz. API
çalışırken bu terminali açık bırakın ve yeni bir PowerShell penceresi açın.

### 4. Frontend'i hazırlayın ve çalıştırın

Yeni PowerShell penceresinde proje köküne geçin:

```powershell
Set-Location .\devgenesis\frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

Frontend varsayılan olarak `http://localhost:3000` adresinde çalışır. Tarayıcıda
bu adresi açarak proje kataloğunu görüntüleyebilirsiniz.

## Geliştirme komutları

Backend API:

```powershell
Set-Location .\backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

Frontend:

```powershell
Set-Location .\frontend
npm run dev
npm run lint
```

Seed komutu idempotent çalışır; mevcut `slug` kayıtlarını günceller, olmayan
projeleri ekler. Bu nedenle proje JSON verilerini değiştirdikten sonra
`python -m app.seed` komutunu yeniden çalıştırabilirsiniz.

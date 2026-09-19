# Alfred Hotel

Portal QR para huéspedes de hotel. Un código QR en cada habitación abre un hub mobile-first con room service, pedidos rápidos, chat con recepción, instalaciones, eventos y galería.

Inspirado en [qr-master](https://github.com/franciscoazzollini/qr-master).

## Demo

- Landing: `/`
- Habitación demo: `/habitacion/305`
- Subpáginas: `/comida`, `/servicios`, `/chat`, `/instalaciones`, `/eventos`, `/galeria`

## Stack

- Next.js 16 + TypeScript + Tailwind + shadcn/ui
- Supabase (Postgres)
- Telegram (notificaciones a recepción)
- Netlify

## Local

```bash
npm install
cp .env.example .env.local
# Completar variables en .env.local
npm run dev
```

Abre [http://localhost:43123](http://localhost:43123)

## Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Copiar URL y keys a `.env.local`
3. Aplicar schema + seed:

```bash
# Opción A: SQL Editor — pegar supabase/apply-all.sql
# Opción B: CLI local (necesita SUPABASE_DB_PASSWORD)
npm run db:apply
npm run db:seed
npm run db:verify
```

## Netlify

1. Importar repo `AlfredHotel` desde GitHub
2. Build: `npm run build` (ya en `netlify.toml`)
3. **Quitar el badge “Powered by Netlify”** (recomendado para producción): en el dashboard, ir a **Project configuration → General → Powered by Netlify badge** y desactivarlo. El repo también incluye un guard que lo oculta en el navegador, pero la opción del dashboard lo elimina para todos los visitantes.
4. Variables de entorno:

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key |
| `SUPABASE_SECRET_KEY` | Secret key (server only) |
| `NEXT_PUBLIC_APP_URL` | URL de Netlify (ej. `https://alfred-hotel.netlify.app`) |
| `TELEGRAM_BOT_TOKEN` | Opcional — bot de recepción |
| `TELEGRAM_CHAT_ID` | Opcional — chat destino |
| `TELEGRAM_NOTIFY_SECRET` | Opcional — proteger API notify |

## Scripts

```bash
npm run dev          # servidor local
npm run build        # build producción
npm run db:apply     # migraciones SQL
npm run db:seed      # datos Alfred Hotel
npm run db:verify    # test conexión Supabase
```

## Licencia

Privado

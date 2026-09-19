# Harbor Hotels

A hotel platform starter built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

This repository is set up as a foundation for a hotel product — property management, direct bookings, guest experiences, and more. The landing page and project structure are ready; feature work can begin from your instructions.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:43123](http://localhost:43123) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Project structure

```
src/
├── app/              # App Router pages and layout
│   └── api/telegram/ # Telegram webhook + build notifications
├── components/       # Shared UI and page components
│   └── ui/           # shadcn/ui primitives
├── lib/telegram/     # Telegram bot client and config
scripts/              # Telegram setup and notify CLI tools
```

## Telegram bot (build notifications)

The project includes a Telegram bot integration for status updates and future build artifacts (typically APK files).

### 1. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Chat ID that should receive build outputs |
| `TELEGRAM_NOTIFY_SECRET` | Secret for protected notify API calls |
| `NEXT_PUBLIC_APP_URL` | Public app URL used for webhook registration |

### 2. Connect the bot

With the dev server running:

```bash
npm run telegram:setup
```

Then open your bot in Telegram and send:

```
/start
```

Copy the chat ID from the bot reply into `TELEGRAM_CHAT_ID` in `.env.local`.

### 3. Send build output (APK or message)

Send a text update:

```bash
npm run telegram:notify -- --message "Harbor Hotels build finished"
```

Send an APK or other artifact:

```bash
npm run telegram:notify -- --file ./dist/app-release.apk --caption "Latest APK build"
```

You can also call the API directly:

```bash
curl -X POST http://localhost:43123/api/telegram/notify \
  -H "Content-Type: application/json" \
  -H "x-telegram-notify-secret: YOUR_NOTIFY_SECRET" \
  -d '{"message":"Build finished","filePath":"./dist/app-release.apk","caption":"Latest APK"}'
```

### Bot commands

| Command | Description |
| --- | --- |
| `/start` | Connect and show your chat ID |
| `/status` | Show project status |
| `/help` | Show available commands |

**Security:** Never commit `.env.local`. If a bot token is exposed, revoke it in BotFather and create a new one.

## Push to GitHub

1. Create a new repository on GitHub (empty, no README).
2. Add the remote and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If a remote is already configured, push with:

```bash
git push -u origin main
```

## Next steps

Share your product requirements and we can extend this starter with:

- Hotel and room listings
- Booking and checkout flows
- Admin dashboards
- Guest accounts and authentication
- Payments and integrations

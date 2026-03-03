# Cute Carter and Beautiful Mommy

A virtual website where Carter plays and chats with his mommy (Emma). Built with the MERN stack.

## Features

- **Login** – Email-based sign up / login with a welcoming page (Carter & Emma photo, decorations).
- **Home** – Tab bar: Chat with Mommy, Game Room, Shopping, My Pictures.
- **Chat** – Childish chat UI with Carter and Emma avatars; emojis and GIFs; Mommy’s replies powered by AI (OpenAI optional) or friendly canned responses.
- **Game Room** – Wallet (coins), game list including **Card Game 44A** (AI mommy placeholder), and other game placeholders.
- **My Pictures** – Carter can upload photos to show to Mommy.

## Tech Stack

- **MongoDB** – Users, chat messages, wallet, uploaded pictures.
- **Express** – REST API, auth (JWT), file uploads.
- **React (Vite)** – Frontend with React Router.
- **Node.js** – Backend runtime.

## Setup

### 1. MongoDB

Install and run MongoDB locally, or use a cloud URI (e.g. MongoDB Atlas). Set `MONGODB_URI` in the server `.env` (see below).

### 2. Backend (server)

```bash
cd server
cp .env.example .env
# Edit .env: set MONGODB_URI, optional JWT_SECRET and OPENAI_API_KEY
npm install
npm run dev
```

Server runs at **http://localhost:5000**.

### 3. Frontend (client)

```bash
cd client
npm install
npm run dev
```

App runs at **http://localhost:3000**. It proxies `/api` and `/uploads` to the backend.

### 4. Optional: AI chat (Mommy’s replies)

In `server/.env`, set:

```env
OPENAI_API_KEY=sk-your-openai-api-key
```

If set, the server uses GPT for Emma’s replies; otherwise it uses built-in loving-mom responses.

## Project layout

- `server/` – Express API, auth, chat, game (wallet), uploads.
- `client/` – React app (Login, Home, Chat, Game, Shopping, Pictures).
- `client/public/assets/` – Carter.png, Carter_and_Emma.jpg (avatars and login image).

## Avatars

- **Carter:** `Carter.png` (chat and profile).
- **Emma / Login:** `Carter_and_Emma.jpg` (Mommy’s avatar and login page image).

Enjoy building and playing with Carter and Emma.

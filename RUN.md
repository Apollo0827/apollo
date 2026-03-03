# How to Run Cute Carter and Beautiful Mommy

## 1. Start MongoDB

The server needs MongoDB. If it’s not running, the server will not start.

- **Installed locally:** Start the MongoDB service (e.g. `mongod` or start “MongoDB Server” in Services).
- **MongoDB Atlas:** In `server/.env` set  
  `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cute-carter`

## 2. Start the backend (Terminal 1)

```bash
cd E:\apollo\server
npm install
npm run dev
```

You should see:

- `MongoDB connected`
- `Server running on port 5000`

If you see **MongoDB connection error**, MongoDB is not running or `MONGODB_URI` is wrong. Fix that first.

## 3. Start the frontend (Terminal 2)

```bash
cd E:\apollo\client
npm install
npm run dev
```

You should see something like:

- `Local: http://localhost:3000/` (or `3001` if 3000 is in use)

## 4. Open the app

In your browser go to: **http://localhost:3000** (or the URL Vite printed).

---

## If something “can’t run”

| Problem | What to do |
|--------|------------|
| `'nodemon' is not recognized` | Use `npx nodemon index.js` (already in package.json) and run `npm install` in `server`. |
| `MongoDB connection error` | Start MongoDB or fix `MONGODB_URI` in `server/.env`. |
| Login/buttons do nothing or network errors | Backend must be running on port 5000. Start `server` with `npm run dev` first. |
| Blank page or can’t open site | Start the **client** with `npm run dev` and open the URL Vite shows (e.g. http://localhost:3000). |
| Port 3000 already in use | Use the other port Vite shows (e.g. 3001) or close the app using 3000. |

**Order:** Start **MongoDB** → then **server** → then **client**, then open the client URL in the browser.

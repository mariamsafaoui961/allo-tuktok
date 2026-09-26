# Allo TukTuk - Admin Dashboard

## 1. Install dependencies

Backend:
```bash
cd backend
npm install
npm start
```

Frontend (new terminal):
```bash
cd frontend
npm install
npm run dev
```

The frontend uses `http://localhost:5173` and the backend uses `http://localhost:5000`.

## 2. Make a user admin

In MongoDB Compass, open `allo-tuktuk` -> `users` and change the user's document to include:
```json
"role": "admin"
```

Example:
```json
{
  "firstName": "Mariam",
  "lastName": "Safaoui",
  "email": "admin@email.com",
  "role": "admin"
}
```

Then logout and login again.

## 3. Open dashboard

Go to:
`http://localhost:5173/admin`

The Admin Dashboard is also shown in the navbar only for users whose role is `admin`.

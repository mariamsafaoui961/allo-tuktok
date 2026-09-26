# Allo TukTuk

Ride-booking web app for Allo TukTuk (Nabatieh, Lebanon), rebuilt as a full MERN
stack app (React + Express + MongoDB) with animations (Framer Motion), replacing
the original static HTML/CSS/JS + PHP prototype.

## Structure

```
Allo-TukTuk/
├── backend/     Express API + MongoDB (Mongoose)
└── frontend/    React app (Vite) + Framer Motion animations
```

## Features

- User registration / login (JWT auth, hashed passwords with bcrypt)
- "Forgot password" endpoint (stub — wire up a real email provider to send links)
- Ride booking form, saved to MongoDB and tied to the logged-in user
- "My Bookings" page (protected route) to view / cancel your bookings
- Contact form saved to MongoDB
- Animated navbar, hero auth forms (login/register/forgot switch with transitions),
  scroll-reveal sections, animated FAQ accordion, animated form feedback

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env     # then edit MONGO_URI / JWT_SECRET
npm install
npm run dev               # http://localhost:5000
```

Requires a running MongoDB instance (local `mongod`, or a MongoDB Atlas URI in
`MONGO_URI`).

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # VITE_API_URL should point at the backend
npm install
npm run dev                # http://localhost:5173
```

## API overview

| Method | Route                     | Auth | Description                     |
|--------|----------------------------|------|----------------------------------|
| POST   | /api/auth/register         | -    | Create an account                |
| POST   | /api/auth/login             | -    | Log in, returns a JWT            |
| POST   | /api/auth/forgot-password   | -    | Request a password reset (stub)  |
| GET    | /api/auth/me                 | yes  | Current user                     |
| POST   | /api/bookings                | yes  | Create a booking                 |
| GET    | /api/bookings/my             | yes  | List my bookings                 |
| DELETE | /api/bookings/:id             | yes  | Cancel a booking                 |
| POST   | /api/contact                 | -    | Send a contact message           |

## Notes / next steps

- The old `my-php-project/index.php` prototype and the static `frontend/`
  HTML/CSS/JS are fully replaced by this app.
- The "forgot password" flow currently only logs to the console — plug in
  Nodemailer/SendGrid/Resend to actually send reset emails.
- For production, deploy the backend (e.g. Render/Railway) with a MongoDB
  Atlas database, and the frontend (e.g. Vercel/Netlify) with `VITE_API_URL`
  pointing at the deployed backend.

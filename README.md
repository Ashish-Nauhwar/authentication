# Authentication

A full-stack authentication application built with **React** and **Node.js**. Users can create an account, sign in, and view their account details on a dashboard. The backend securely stores hashed passwords and uses JSON Web Tokens (JWT) for authentication.

## Features

- User registration with username, email, and password.
- User login with email and password.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected profile API.
- Session persistence using browser localStorage.
- User dashboard displaying ID, username, and email.
- Sign out functionality.
- Responsive UI using Tailwind CSS.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React 19, Vite 8 |
| Styling | Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Other Tools | dotenv, CORS, Joi |

## Project Structure

```text
authentication/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── vercel.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB or MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/Ashish-Nauhwar/authentication.git
cd authentication
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

## API Endpoints

Base URL: `/api/v1/users`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register-user` | Register a new user |
| POST | `/login-user` | Login user |
| GET | `/profile` | Get authenticated user profile |

### Authentication Flow

1. User creates an account.
2. Backend validates the registration details.
3. Password is hashed using bcrypt.
4. User data is stored in MongoDB.
5. JWT token is generated after successful registration or login.
6. Frontend stores user details and token in localStorage.
7. Protected routes verify the JWT token before providing user data.

## Available Frontend Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Security

- Passwords are stored in hashed form.
- JWT is used to authenticate users.
- Protected API routes require a valid token.
- Environment variables are used for sensitive configuration.

**Note:** The frontend currently clears localStorage on sign out; it does not revoke an existing JWT through a backend logout endpoint. The backend logout route also needs correction before it can be used.

## Author

**Ashish Nauhwar**

GitHub: [Ashish-Nauhwar](https://github.com/Ashish-Nauhwar)




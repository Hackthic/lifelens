# LifeLens - Comprehensive Health Tracking Platform

A full-stack health tracking and disease prevention platform built with React (frontend) and Node.js/Express/MongoDB (backend).

## 🌟 Features

- 📊 Comprehensive health tracking (nutrition, sleep, activity, screen time)
- 🔐 Secure user authentication (JWT)
- 🌍 Real-time Air Quality Index (AQI) monitoring
- 📱 Mobile-first responsive design
- 🌙 Dark mode support
- 🌐 Multi-language support (English/Hindi)
- 🎯 AI-powered health insights (coming soon)

## 📁 Project Structure

```
lifelens/
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/  # API integration
│   │   └── ...
│   └── package.json
├── backend/            # Node.js + Express backend
│   ├── config/        # Database connection
│   ├── controllers/   # Business logic
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Auth & validation
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd lifelens
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT secret

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add backend API URL

# Start frontend dev server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Daily Tracking
- `POST /api/tracking/daily` - Submit daily health data
- `GET /api/tracking/history` - Get tracking history
- `GET /api/tracking/today` - Get today's tracking

## 🛠️ Technologies

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Helmet (Security)
- CORS
- express-validator

## 📱 Mobile Support

The application is designed with a mobile-first approach and fully supports:
- Responsive layouts for all screen sizes
- Touch-friendly interfaces
- Optimized for both iOS and Android browsers

## 🔐 Security

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting (100 requests/15 minutes)
- Helmet security headers
- Input validation and sanitization
- CORS configuration

## 📝 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

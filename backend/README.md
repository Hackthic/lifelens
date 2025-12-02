# LifeLens Backend API

Backend API for the LifeLens health tracking platform built with Node.js, Express, and MongoDB.

## Features

- ✅ User authentication (JWT)
- ✅ User registration with comprehensive health profile
- ✅ Daily health tracking
- ✅ Profile management
- ✅ Rate limiting and security headers
- ✅ Input validation
- ✅ Error handling

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Profile
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Daily Tracking
- `POST /api/tracking/daily` - Submit daily health data (protected)
- `GET /api/tracking/history` - Get tracking history (protected)
- `GET /api/tracking/today` - Get today's tracking (protected)

### Health Check
- `GET /api/health` - Server health check

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── auth.controller.js # Authentication logic
│   ├── user.controller.js # User management
│   └── tracking.controller.js # Daily tracking
├── middleware/
│   ├── auth.middleware.js # JWT verification
│   ├── error.middleware.js # Error handling
│   └── validate.middleware.js # Input validation
├── models/
│   ├── User.js            # User schema
│   └── DailyTracking.js   # Daily tracking schema
├── routes/
│   ├── auth.routes.js     # Auth routes
│   ├── user.routes.js     # User routes
│   └── tracking.routes.js # Tracking routes
├── .env.example           # Environment template
├── package.json
└── server.js              # Main entry point
```

## Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin support
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting

## Security

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet for security headers
- Input validation and sanitization
- CORS configuration

# 🚀 Quick Start Guide for LifeLens

This guide will help you set up and run the LifeLens application locally.

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js v16+ installed
- ✅ MongoDB installed locally OR MongoDB Atlas account
- ✅ Git installed

---

## Step 1: Setup MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/lifelens`)

### Option B: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Your connection string will be: `mongodb://localhost:27017/lifelens`

---

## Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies (already done if you ran npm install earlier)
npm install

# Create .env file
# Copy these lines and create a file named .env
```

**Create `backend/.env` file with this content:**
```env
PORT=5000
NODE_ENV=development

# UPDATE THIS with your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/lifelens
# OR
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifelens

JWT_SECRET=c42cdfb2327c02bfb1ddde6de577f38b1efee70e64fca04b
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:5173
```

**Start the backend server:**
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0...
🚀 Server running in development mode on port 5000
```

---

## Step 3: Frontend Setup

Open a **NEW terminal window/tab** and:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (if not already done)
npm install

# Copy the existing .env file or create one
# Update the API URL if needed
```

**Ensure `frontend/.env` has:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_AQI_API_KEY=your_aqi_api_key_here
```

**Start the frontend dev server:**
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Step 4: Test the Application

1. Open your browser and go to `http://localhost:5173`
2. Click on "Try Demo" or "Get Started"
3. Create a new account (sign up)
4. You should be logged in and see your dashboard!

---

## 🧪 Testing the API

You can test the API endpoints using:
- **Postman** - Import the endpoints from `backend/API.md`
- **Thunder Client** (VS Code extension)
- **curl** commands

### Example: Health Check
```bash
curl http://localhost:5000/api/health
```

### Example: Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check if MongoDB is running
- ✅ Verify MongoDB connection string in `.env`
- ✅ Check if port 5000 is available

### Frontend won't connect to backend
- ✅ Make sure backend is running on port 5000
- ✅ Check `VITE_API_URL` in frontend `.env`
- ✅ Check browser console for CORS errors

### "Module not found" errors
- ✅ Run `npm install` in both frontend and backend folders
- ✅ Delete `node_modules` and `package-lock.json`, then run `npm install` again

---

## 📝 Next Steps

1. ✅ Create your first user account
2. ✅ Explore the demo section
3. ✅ Try submitting daily tracking data
4. ✅ Check the API documentation in `backend/API.md`
5. ✅ Read the full README.md for more details

---

## 🆘 Need Help?

- Check `backend/API.md` for detailed API documentation
- Review the code in `frontend/src/services/api.js` for API usage
- Look at the models in `backend/models/` to understand data structure

**Happy coding! 🎉**

# LifeLens Backend Deployment Guide

This guide walks you through deploying the LifeLens backend API to Railway.app.

## Prerequisites

- A [Railway.app](https://railway.app) account
- A MongoDB database (MongoDB Atlas recommended)
- Git repository connected to Railway

## Environment Variables

Before deploying, you **must** configure the following environment variables in Railway:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/lifelens` |
| `JWT_SECRET` | Secret key for JWT signing (min 32 chars) | `your-super-secret-key-change-in-production` |
| `NODE_ENV` | Environment mode | `production` |
| `FRONTEND_URL` | Your deployed frontend URL for CORS | `https://your-app.vercel.app` |
| `JWT_EXPIRE` | JWT token expiration time | `7d` |

### Setting Environment Variables in Railway

1. Go to your project in Railway dashboard
2. Select your backend service
3. Click on the **Variables** tab
4. Click **New Variable** and add each variable above
5. Click **Deploy** to apply changes

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Connect Your Repository**
   - Go to [Railway.app](https://railway.app)
   - Click **New Project** → **Deploy from GitHub repo**
   - Select your `lifelens` repository
   - Choose the `backend` directory as the root

2. **Configure Build Settings**
   - Railway will auto-detect the Node.js project
   - Ensure the build command is: `npm install`
   - Ensure the start command is: `npm start`

3. **Set Environment Variables**
   - Follow the steps in "Setting Environment Variables in Railway" above

4. **Deploy**
   - Click **Deploy**
   - Monitor the deployment logs
   - Wait for successful deployment

### Option 2: Deploy using Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Set environment variables
railway variables set MONGODB_URI="your-mongodb-uri"
railway variables set JWT_SECRET="your-jwt-secret"
railway variables set NODE_ENV="production"
railway variables set JWT_EXPIRE="7d"
railway variables set FRONTEND_URL="your-frontend-url"

# Deploy
railway up
```

## MongoDB Setup (MongoDB Atlas)

If you don't have a MongoDB database yet:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Railway access
5. Get your connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `lifelens`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lifelens?retryWrites=true&w=majority
```

## Verifying Deployment

After deployment completes:

1. **Check Deployment Logs**
   ```
   ✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
   📊 Database: lifelens
   🚀 Server running in production mode
   📡 Listening on 0.0.0.0:XXXX
   ```

2. **Test Health Endpoint**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - Should return:
     ```json
     {
       "success": true,
       "message": "LifeLens API is running",
       "timestamp": "2025-12-06T..."
     }
     ```

3. **Update Frontend**
   - Update your frontend `.env` file with the Railway backend URL:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app
     ```

## Troubleshooting

### Issue: "MONGODB_URI is not defined"

**Solution:** Make sure you've added `MONGODB_URI` to Railway environment variables.

### Issue: "Application failed to respond"

**Solution:** 
- Check that your MongoDB connection string is correct
- Ensure your MongoDB cluster allows connections from anywhere (0.0.0.0/0)
- Check Railway deployment logs for errors

### Issue: "Cannot connect to MongoDB"

**Solution:**
- Verify your MongoDB Atlas cluster is running
- Check that the username/password in the connection string are correct
- Ensure your IP whitelist includes 0.0.0.0/0 in MongoDB Atlas

### Issue: "CORS errors from frontend"

**Solution:**
- Ensure `FRONTEND_URL` environment variable is set to your deployed frontend URL
- Verify CORS is configured correctly in `server.js`

## Monitoring

- **Deployment Logs:** Railway Dashboard → Your Service → Deployments
- **Runtime Logs:** Railway Dashboard → Your Service → View Logs
- **Metrics:** Railway Dashboard → Your Service → Metrics

## Updating the Deployment

To deploy new changes:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. Railway will automatically detect the changes and redeploy

## Support

For issues:
- Check Railway deployment logs
- Review MongoDB connection status
- Verify all environment variables are set correctly
- Check the [Railway documentation](https://docs.railway.app)

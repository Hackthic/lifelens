# LifeLens Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 🔐 Authentication

#### 1. Sign Up
Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "age": 30,
  "gender": "male",
  "phone": "9876543210",
  "healthProfile": {
    "height": 175,
    "weight": 70,
    "bloodGroup": "O+",
    "preExistingConditions": ["Diabetes"],
    "allergies": ["Peanuts"],
    "medications": ["Metformin"]
  },
  "lifestyle": {
    "activityLevel": "moderate",
    "dietaryPreference": "vegetarian",
    "smokingStatus": "never",
    "alcoholConsumption": "occasionally"
  },
  "location": {
    "city": "Delhi",
    "state": "Delhi",
    "country": "India"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "gender": "male"
    },
    "token": "jwt_token_here"
  }
}
```

---

#### 2. Login
Authenticate and receive a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

#### 3. Get Current User
Get authenticated user's information.

**Endpoint:** `GET /auth/me`  
**Auth Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "healthProfile": {},
      "lifestyle": {},
      "location": {}
    }
  }
}
```

---

### 👤 User Profile

#### 4. Get Profile
Get user's full profile.

**Endpoint:** `GET /users/profile`  
**Auth Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      // Full user object with all fields
    }
  }
}
```

---

#### 5. Update Profile
Update user profile information.

**Endpoint:** `PUT /users/profile`  
**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "John Updated",
  "age": 31,
  "healthProfile": {
    "weight": 68
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      // Updated user object
    }
  }
}
```

---

### 📊 Daily Tracking

#### 6. Submit Daily Tracking
Submit or update daily health tracking data.

**Endpoint:** `POST /tracking/daily`  
**Auth Required:** Yes

**Request Body:**
```json
{
  "date": "2025-12-03",
  "nutrition": {
    "waterIntake": 2000,
    "totalCalories": 1800,
    "meals": [
      {
        "name": "Breakfast",
        "time": "08:00",
        "items": ["Oatmeal", "Banana"],
        "calories": 350
      }
    ]
  },
  "sleep": {
    "duration": 7.5,
    "quality": "good",
    "bedTime": "23:00",
    "wakeTime": "06:30"
  },
  "activity": {
    "steps": 8500,
    "exerciseDuration": 30,
    "exerciseType": ["Running"],
    "caloriesBurned": 300
  },
  "screenTime": {
    "total": 360
  },
  "environment": {
    "aqi": 150,
    "timeOutdoors": 60
  },
  "mental": {
    "mood": "good",
    "stressLevel": 5,
    "notes": "Productive day"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Daily tracking data saved successfully",
  "data": {
    "tracking": {
      // Saved tracking object
    }
  }
}
```

---

#### 7. Get Tracking History
Retrieve historical tracking data.

**Endpoint:** `GET /tracking/history?startDate=2025-12-01&endDate=2025-12-03&limit=30`  
**Auth Required:** Yes

**Query Parameters:**
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)
- `limit` (optional): Number of records (default: 30)

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": {
    "tracking": [
      // Array of tracking objects
    ]
  }
}
```

---

#### 8. Get Today's Tracking
Get tracking data for today.

**Endpoint:** `GET /tracking/today`  
**Auth Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "data": {
    "tracking": {
      // Today's tracking or null if not yet tracked
    }
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [  // Optional, for validation errors
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Common Error Codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Exceeded:** Returns 429 status code

---

## Health Check

**Endpoint:** `GET /health`

**Response (200):**
```json
{
  "success": true,
  "message": "LifeLens API is running",
  "timestamp": "2025-12-03T00:00:00.000Z"
}
```

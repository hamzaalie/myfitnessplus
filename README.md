# MyFitnessPlus V2

A full-stack fitness tracking web application built with React and Node.js/Express. Features complete backend integration with MongoDB, JWT authentication, and real-time data persistence across all features.

## ✨ Features

### **Authentication & Security**
- User registration with email validation
- Secure login with JWT tokens (24-hour expiry)
- Password hashing with bcrypt (10 salt rounds)
- Protected routes and API endpoints
- Auto-redirect logic for authenticated users

### **Dashboard**
- Real-time calorie tracking from meals
- Workout completion status
- Water intake monitoring
- Weekly highlights and statistics
- Motivational quotes

### **Meal Prep**
- Create, edit, and delete meals
- Calorie and protein tracking
- Daily meal filtering
- Progress bars for nutrition goals
- Meal types: Breakfast, Lunch, Dinner, Snack

### **Workout Plans**
- Weekly workout scheduling (Monday-Sunday)
- Create custom workout plans
- Edit and delete workouts
- Track exercise completion with checkboxes
- Automatic completion percentage calculation
- Support for rest days

### **Goals Tracking**
- Set fitness goals across categories (Weight, Cardio, Strength, Habits)
- Track progress with current vs target values
- Visual progress bars
- Edit and delete goals
- Real-time progress calculations

### **Progress Monitoring**
- RAG (Red-Amber-Green) traffic light system
- Overall progress score calculation
- Individual goal status indicators
- Motivational messages based on progress

### **Profile Management**
- Edit personal information
- Set fitness goals and target calories
- Track weight and height
- Dark mode toggle (persisted to database)
- Badge/achievement system

### **Water Tracking**
- Daily water intake monitoring
- Add/remove glasses of water
- Integration with dashboard

## 🛠 Tech Stack

- **Frontend:** React 18.2, React Router 6.21, Axios 1.6, Context API
- **Backend:** Node.js, Express 4.18, Mongoose 8.0
- **Database:** MongoDB Atlas
- **Authentication:** JWT (jsonwebtoken), bcrypt
- **Validation:** express-validator
- **Dev Tools:** Nodemon, Concurrently

## 📁 Project Structure

```
MyFitnessPlus/
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/     # Navbar, ProtectedRoute
│       ├── context/        # AuthContext, DarkModeContext
│       ├── pages/          # Dashboard, MealPrep, Workout, Goals, Progress, Profile
│       ├── services/       # API client (Axios)
│       └── utils/          # Helper functions
├── server/                 # Node.js Backend
│   ├── config/             # Database connection
│   ├── middleware/         # JWT auth middleware
│   ├── models/             # Mongoose schemas (User, Meal, Workout, Goal, WaterIntake)
│   ├── routes/             # API endpoints
│   └── scripts/            # Seed data scripts
├── .env                    # Environment variables (create this)
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (free) - [Sign up](https://www.mongodb.com/cloud/atlas)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd MyFitnessPlus
```

### 2. Install Dependencies

**Option A - Install All at Once (Recommended):**
```bash
npm run install-all
```

**Option B - Install Separately:**
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. MongoDB Setup

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster (Free Tier M0 is sufficient)
   - Wait for cluster to deploy (~5 minutes)

2. **Get Your Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/`)
   - Replace `<password>` with your database user password

3. **Whitelist Your IP:**
   - Go to "Network Access" in Atlas
   - Add IP Address
   - For development, you can allow access from anywhere: `0.0.0.0/0`
   - *For production, restrict to specific IPs only*

### 4. Environment Variables

Create a `.env` file in the **root directory** with the following:

```env
# Server Port
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.xxxxx.mongodb.net/myfitnessplus?retryWrites=true&w=majority

# JWT Secret (use a random string)
JWT_SECRET=your_super_secret_key_here_make_it_long_and_random

# Node Environment
NODE_ENV=development
```

**Generate a secure JWT_SECRET:**
```bash
# On Windows (PowerShell):
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# On Mac/Linux:
openssl rand -hex 32
```

### 5. Seed Sample Data (Optional but Recommended)

After setting up MongoDB, seed your database with sample data:

```bash
# Create a test user first by running the app and signing up
# OR seed all data for a specific user email:

npm run seed:all your-email@example.com
```

**Individual Seed Commands:**
```bash
npm run seed:workouts hamzaaliaps098@gmail.com
npm run seed:goals hamzaaliaps098@gmail.com
npm run seed:meals hamzaaliaps098@gmail.com
```

### 6. Run the Application

**Development Mode** (runs both frontend and backend):
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

**Run Separately:**
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

### 7. Access the Application

Open your browser and go to:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000/api/health`

## 🔑 Test Account

If you used seed scripts, you can login with:
- **Email:** `hamzaaliaps098@gmail.com`
- **Password:** (the password you used when creating this user)

Or create a new account using the Sign Up page.

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/user` | Get current user | Yes |

### Meals
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/meals` | Get all meals (filtered by date) | Yes |
| GET | `/api/meals/:id` | Get meal by ID | Yes |
| POST | `/api/meals` | Create new meal | Yes |
| PUT | `/api/meals/:id` | Update meal | Yes |
| DELETE | `/api/meals/:id` | Delete meal | Yes |

### Workouts
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/workouts` | Get all workouts | Yes |
| GET | `/api/workouts/:id` | Get workout by ID | Yes |
| POST | `/api/workouts` | Create new workout | Yes |
| PUT | `/api/workouts/:id` | Update workout | Yes |
| PUT | `/api/workouts/:id/exercise/:index` | Toggle exercise completion | Yes |
| DELETE | `/api/workouts/:id` | Delete workout | Yes |

### Goals
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/goals` | Get all goals | Yes |
| GET | `/api/goals/:id` | Get goal by ID | Yes |
| POST | `/api/goals` | Create new goal | Yes |
| PUT | `/api/goals/:id` | Update goal | Yes |
| DELETE | `/api/goals/:id` | Delete goal | Yes |

### Water Intake
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/water-intake` | Get water intake (filtered by date) | Yes |
| PUT | `/api/water-intake/add` | Add one glass of water | Yes |
| PUT | `/api/water-intake/remove` | Remove one glass of water | Yes |
| PUT | `/api/water-intake/set` | Set specific water amount | Yes |

### Profile
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/profile` | Get user profile | Yes |
| PUT | `/api/profile` | Update profile | Yes |
| PUT | `/api/profile/theme/dark-mode` | Update dark mode preference | Yes |
| PUT | `/api/profile/badges/unlock` | Unlock achievement badge | Yes |

### Health Check
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/health` | API status check | No |

**Protected endpoints** require JWT token in Authorization header: `Bearer <token>`

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem:** `MongoDB connection failed` or `MongooseServerSelectionError`

**Solutions:**
1. Verify your MongoDB Atlas connection string in `.env` is correct
2. Ensure your database password doesn't contain special characters (or URL-encode them)
3. Check Network Access in Atlas - add `0.0.0.0/0` for development
4. Verify your cluster is running (not paused)

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Windows PowerShell - Kill process on port 5000
Stop-Process -Name node -Force

# Or change PORT in .env
PORT=5001
```

### Frontend Won't Connect to Backend

**Problem:** API calls failing from React app

**Solutions:**
1. Check `client/package.json` has proxy: `"proxy": "http://localhost:5000"`
2. Ensure backend is running (`npm run server`)
 Verify backend is on port 5000 (check console output)
4. Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

### Seed Scripts Failing

**Problem:** `User not found` when running seed scripts

**Solutions:**
1. Create the user first:
   - Run the app (`npm run dev`)
   - Sign up with the email you're trying to seed
2. Or check the email matches exactly (case-sensitive)

### Token Expired Error

**Problem:** `Token is not valid` after some time

**Solution:** 
- Tokens expire after 24 hours - just log out and log back in
- For development, you can increase expiry in `server/routes/auth.js`

### Module Not Found Errors

**Problem:** `Cannot find module 'xyz'`

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules
rm -rf client/node_modules
npm install
cd client && npm install
```

## 🧪 Testing

### Manual Testing

1. **Create an account** - Sign up with a new email
2. **Test Dashboard** - Verify stats aggregate correctly
3. **Create a meal** - Navigate to Meal Prep, add a meal
4. **Refresh page** - Ensure meal persists
5. **Create a workout** - Use "+ Create Workout" button
6. **Toggle exercises** - Mark exercises complete
7. **Set a goal** - Add a fitness goal with target
8. **Check Progress** - Verify RAG colors display correctly
9. **Edit Profile** - Update target calories, check dashboard updates

### API Testing

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

## 📝 Available Scripts

**Root Directory:**
```bash
npm run dev          # Run both frontend and backend concurrently
npm run server       # Run backend only (with nodemon)
npm run client       # Run frontend only
npm start            # Run backend in production mode
npm run install-all  # Install all dependencies (root + client)
npm run seed:all     # Seed all data for a user
npm run seed:workouts # Seed workouts only
npm run seed:goals   # Seed goals only
npm run seed:meals   # Seed meals only
```

**Client Directory:**
```bash
cd client
npm start            # Start React development server
npm run build        # Build for production
npm test             # Run tests
```

## 🔒 Security Notes

- Never commit `.env` file to version control (it's in `.gitignore`)
- Use strong, unique JWT_SECRET in production
- Change MongoDB password regularly
- For production, restrict MongoDB Network Access to specific IPs
- Enable MongoDB Atlas encryption at rest
- Use environment-specific `.env` files

## 📚 Project Documentation

Additional documentation available:
- **DELIVERABLES_AUDIT.md** - Complete feature audit
- **V2_AUDIT_REPORT.md** - Technical audit report
- **TESTING_CHECKLIST.md** - Testing procedures
- **AUDIT_SUMMARY.md** - Executive summary

## 🚀 Deployment

(Coming soon - deployment guide for Heroku/Vercel/Railway)

## 📄 License

MIT License

## 👤 Author

Developed as part of a Final Year Project demonstrating full-stack web development skills with React, Node.js, Express, and MongoDB.

---

**Need Help?** Check the Troubleshooting section or review the audit documents in the project root.

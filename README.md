# MyFitnessPlus

A fitness tracking web application built with React and Node.js/Express. This is a draft-level project demonstrating a functional, well-structured system with real user authentication and core fitness-related features.

## Features

- **User Authentication**: Sign-up and login with hashed passwords and JWT tokens
- **Dashboard**: Central hub displaying fitness overview and quick access to all features
- **Meal Prep**: Weekly meal planning with calorie and protein tracking
- **Workout Plans**: Structured weekly workout routines with exercises, sets, and reps
- **Personal Progress**: Traffic-light system (red/amber/green) showing progress status
- **Goals**: Track fitness goals and achievements

## Tech Stack

- **Frontend**: React 18, React Router 6
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt password hashing

## Project Structure

```
MyFitnessPlus/
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── context/        # Auth context
│       ├── data/           # Mock data
│       ├── pages/          # Page components
│       └── services/       # API services
├── server/                 # Node.js Backend
│   ├── config/             # Database config
│   ├── middleware/         # Auth middleware
│   ├── models/             # User model
│   └── routes/             # API routes
├── .env                    # Environment variables
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository or navigate to the project folder

2. Install all dependencies:
   ```bash
   npm run install-all
   ```

   Or install separately:
   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   ```

### Running the Application

**Development Mode** (runs both server and client concurrently):
```bash
npm run dev
```

**Run Server Only**:
```bash
npm run server
```

**Run Client Only**:
```bash
npm run client
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/user` | Get current user (protected) |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/myfitnessplus
```

**Note**: Make sure MongoDB is running locally or update `MONGODB_URI` to point to your MongoDB instance (e.g., MongoDB Atlas).

## Mock Data

The application uses mock data for:
- Meal plans (weekly meals with nutrition info)
- Workout routines (exercises, sets, reps)
- Progress tracking (with traffic-light status)
- Goals and achievements

This data is stored in `client/src/data/mockData.js` and can be extended or connected to a real backend in the future.

## Future Enhancements

- Full backend integration for meals, workouts, progress, and goals
- Data persistence for user preferences
- Charts and analytics
- Social features
- Mobile responsiveness improvements

## License

MIT License

---

**Note**: This is a draft-level project developed as part of a final year project, demonstrating understanding of frontend-backend interaction, authentication workflows, and database usage.

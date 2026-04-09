# MyFitnessPlus — Presentation Script (20 Minutes)

---

## SLIDE 1 — Title Slide (~30 seconds)

Hi everyone. Today I'll be presenting my project, **MyFitnessPlus** — a full-stack fitness tracking web application. This is my project progress review, where I'll walk you through the stakeholders involved, the requirements, the system architecture, and the timeline of my development so far.

---

## SLIDE 2 — Agenda (~30 seconds)

Here's a quick overview of what I'll cover today. I'll begin with a project overview, then move into stakeholder identification using the Onion Model. After that I'll go through the functional and non-functional requirements, the use case diagram, the system architecture and technology stack. I'll also show key diagrams including a sequence diagram and activity diagram, explain the main algorithms in the system, then finish with an updated time schedule and next steps.

---

## SLIDE 3 — Project Overview (~1.5 minutes)

So what is MyFitnessPlus? It's a full-stack web application designed to help users manage their fitness journey in one place. The idea is to give users a personal health companion where they can plan their meals, follow structured workout plans, set and track goals, and monitor progress — all through a clean, modern interface.

On the left you can see the core purpose — it's a fitness tracking app with a traffic light system that gives users a quick visual indicator of how they're doing across different health categories.

On the right are the key features I've built so far — user authentication for secure accounts, an interactive dashboard that gives a daily snapshot, a weekly meal prep planner with calorie and protein tracking, structured workout plans with exercises broken down by sets, reps, and rest periods, a goals tracker that shows progress percentages, and the progress monitoring system using the Red-Amber-Green traffic light approach.

---

## SLIDE 4 — Stakeholder Identification: Onion Model (~2 minutes)

For stakeholder identification I've used the Onion Model, which organises stakeholders into concentric layers based on their closeness to the product.

At the **core** is me — the developer and project owner. I'm building, designing, and testing the entire application. All technical and scope decisions go through me.

The next layer is **The System** — this includes the end users, which are fitness enthusiasts who would actually use the application day-to-day. It also includes anyone who's helped test the interface and provided feedback on usability.

Moving out to the **Wider Business** layer — this includes my module supervisor and the university, who set the project requirements and grading criteria. They provide guidance through milestone check-ins and ensure the project meets academic standards. Peer reviewers also sit in this layer.

The outermost layer is the **External Environment** — this includes fitness industry trends that influenced what features to include, data privacy regulations like GDPR that affect how user data is handled, and competitor applications like MyFitnessPal that provided inspiration and benchmarking for features.

---

## SLIDE 5 — Stakeholder Roles & Interests (~1.5 minutes)

Going a bit deeper into each stakeholder group:

As the **Developer and Project Owner**, I'm responsible for the full development lifecycle — from design to deployment. Every decision about technology choices and feature priority comes from me.

**End Users** — fitness enthusiasts — are the primary audience. Their needs shaped the features I prioritised. They need an intuitive interface that's quick to navigate, with useful tools like meal plans and workout tracking.

The **Module Supervisor and University** set the academic standards and project requirements. Their feedback during check-ins influenced how I structured the project and what documentation I prepared.

**External factors** like industry trends told me what users expect from fitness apps in 2025/2026. GDPR compliance meant I needed to handle user data securely with proper authentication. Looking at competitor apps helped me identify what features are essential versus nice-to-have.

---

## SLIDE 6 — Functional Requirements: Implemented (~2 minutes)

Now moving to requirements. On the left are the authentication features that are fully implemented. Users can register with name, email, and password — all validated on the server side. Login generates a JWT token that's stored client-side. I've implemented protected routes so unauthenticated users can't access the dashboard or other features. There's auto-redirect logic — if you're logged in and try to visit the landing page, you're sent straight to the dashboard.

On the right are the core feature pages. The dashboard aggregates your daily stats — calories consumed, workout status, water intake, and steps — with a weekly highlights section. The meal prep page provides a full 7-day plan with calorie and protein tracking per meal. The workout page has a structured weekly schedule with exercises, sets, reps, and rest times. The goals page tracks multiple fitness objectives with progress percentages. And the progress page uses the RAG traffic light system across 6 health categories.

---

## SLIDE 7 — Functional Requirements: Pending (~1 minute)

There are also features still in progress. The main gap right now is data persistence — the meal plans, workout data, goals, and progress are currently using mock data on the client side. The next major phase is building out the CRUD API routes and storing this data in MongoDB so it's user-specific and persistent.

On the enhancements side, I still need to add user profile editing, custom meal and workout creation where users can input their own data, historical charting to see progress over time, and eventually deployment to production hosting.

---

## SLIDE 8 — Non-Functional Requirements (~1.5 minutes)

For non-functional requirements, I've addressed four key areas:

**Security** — the application uses JWT token-based authentication, passwords are hashed using bcrypt with 10 salt rounds, all API routes are protected with middleware, and input is validated server-side using express-validator.

**Performance** — it's a React single-page application so navigation is instant with client-side routing. State management uses React's built-in Context API to avoid unnecessary re-renders, and the development setup uses Concurrently to run front and backend simultaneously.

**Usability** — I've gone with a clean, dark-themed modern UI. The traffic light system is a deliberate UX choice — it gives users an immediate visual understanding of their status. The navigation is consistent across all pages.

**Maintainability** — the codebase follows a modular, component-based architecture. There's a clear separation of concerns following an MVC-like pattern. The API service layer is centralised in one file, and state management uses the Context API to keep things clean.

---

## SLIDE 9 — Use Case Diagram (~1.5 minutes)

This is the use case diagram showing how different actors interact with the system. There are two main actors — a Guest User and a Registered User — plus two system actors: the Database and the Auth Server.

A Guest User can visit the landing page and either register or log in. Once authenticated, a Registered User has access to all the main features — viewing the dashboard, managing meal plans, viewing workout plans, tracking goals, monitoring progress with the RAG system, and viewing achievements. They can also edit their profile and log out.

On the back end, the Database stores all user data and the Auth Server handles token generation and verification. The use cases in amber — Edit Profile and some of the data management features — are the ones still pending full implementation.

---

## SLIDE 10 — System Architecture (~2 minutes)

The application follows a classic 3-tier client-server architecture.

The **Presentation Tier** is built with React 18. It handles all the UI components, pages, client-side routing with React Router v6, state management through the Context API, and communicates with the backend using Axios as the HTTP client.

The **Application Tier** runs on Node.js with Express. This is the REST API layer that handles authentication, input validation, JWT middleware, and CORS configuration. Currently the main routes are for auth — register, login, and get user — with more CRUD routes planned.

The **Data Tier** uses MongoDB with Mongoose as the ODM. Right now the User model is the primary schema, storing name, email, and hashed passwords. As I build out the CRUD features, I'll add models for meals, workouts, and goals.

The arrows between the tiers show the communication flow — the frontend makes HTTP requests to the Express API, which in turn queries MongoDB through Mongoose.

---

## SLIDE 11 — Technology Stack (~1 minute)

A quick breakdown of the tech stack. On the frontend: React 18.2 as the main UI library, React Router DOM 6.21 for navigation, Axios for API calls, and plain CSS for styling.

Backend: Node.js runtime, Express 4.18 as the web framework, MongoDB as the database, Mongoose 8.0 as the ODM layer, JWT for auth tokens, and bcrypt for password security.

Dev tools include Nodemon for hot reloading the server, Concurrently for running both servers in development, express-validator for input validation, dotenv for environment configuration, and Git for version control.

---

## SLIDE 12 — Component Structure (~1 minute)

Here's the component structure laid out. On the frontend, under the src folder, you've got the main App.js which handles routing. Components folder has the Navbar and ProtectedRoute guard. Context folder has AuthContext for managing login state. Pages folder has all seven pages — Landing, Login, Signup, Dashboard, Progress, MealPrep, Workout, and Goals. The services folder has a centralised API client, and data folder has the mock data.

On the backend, it's a clean Express structure — server.js as the entry point, config folder for database connection, middleware for JWT verification, models for the Mongoose schemas, and routes for the API endpoints.

---

## SLIDE 13 — Data Organisation (~1 minute)

For data organisation — the User Model in MongoDB stores the essential fields: a unique ID, name, email (unique and lowercase), the bcrypt-hashed password, and automatic timestamps.

Currently, the feature data — progress categories, meal plans, workout schedules, goals, and dashboard summaries — lives as mock data in the client. This is a deliberate interim approach that lets the frontend work fully while the backend API routes are being built. The plan is to migrate all of this to database-backed API endpoints.

The data flow for authentication goes: user submits credentials, Express validates input, Mongoose queries MongoDB, bcrypt compares passwords, JWT generates a token, the token is stored in localStorage, and then Axios includes it in all subsequent API headers.

---

## SLIDE 14 — Sequence Diagram: Auth Flow (~1.5 minutes)

This sequence diagram shows the login authentication flow step by step. The user enters their email and password in the browser. React sends a POST request to the Express API at /api/auth/login. Express validates the input using express-validator. Then it queries MongoDB using Mongoose to find the user by email. Once the user document is returned, bcrypt compares the entered password against the stored hash. If it matches, the JWT service signs a token with the user's ID and a 24-hour expiry. That token is sent back through the chain — Express returns it to React, React stores it in localStorage, and then redirects the user to the dashboard. For all subsequent requests, Axios automatically attaches the token in the Authorization header, and the middleware verifies it before granting access to protected routes.

---

## SLIDE 15 — Activity Diagram (~1 minute)

This activity diagram maps the user's journey through the application. Starting from the landing page, a user either registers or logs in. After successful authentication, they land on the dashboard. From there, they can navigate to any of the four main features — Progress, Meal Prep, Workout Plans, or Goals.

Each feature has its own depth — Progress shows the RAG traffic light across 6 categories, Meal Prep displays 7 days of meals with calorie and protein breakdowns, Workout shows daily exercise plans with sets and reps, and Goals tracks objectives with percentage completion and achievements. At any point, the user can log out and return to the landing page.

---

## SLIDE 16 — Algorithms & Calculations (~1.5 minutes)

There are three main algorithmic areas in the project.

First, the **Traffic Light RAG System**. Each of the 6 progress categories has a score calculated as current value divided by target, times 100. If the score is 80% or above, it's green — on track. Between 50 and 79%, it's amber — needs attention. Below 50%, it's red — behind. The overall score is an average of all six categories.

Second, **Nutrition Calculations**. The system sums up calories and protein across all meals in a day to get daily totals. Progress bars are calculated as consumed divided by target, times 100 percent. Weekly averages divide the 7-day totals by 7.

Third, the **Authentication Algorithm**. During registration, bcrypt generates a salt with 10 rounds and hashes the password. During login, bcrypt.compare checks the entered password against the stored hash. On success, JWT signs a token with the user's ID and a 24-hour expiry time, using a secret key stored in environment variables.

---

## SLIDE 17 — Updated Time Schedule (~1 minute)

Here's the updated timeline. Phases 1 and 2 — planning, research, and UI prototyping — were completed on schedule between October and December 2025. Phase 3 — frontend development — was actually completed slightly ahead of schedule, finishing in late January. Phase 4 — backend and authentication — is at 90%, with just some refinements needed. We're currently in Phase 5 — data persistence — which is about 30% complete. Testing and deployment are still upcoming in March through May.

---

## SLIDE 18 — Timeline Changes (~1 minute)

There have been a few adjustments to the original timeline. The frontend was completed ahead of schedule because the modular component architecture made development faster than expected.

However, the backend authentication phase took about a week longer than planned. Getting the MongoDB connectivity, JWT flow, and middleware working correctly required some iteration.

As a result, the data persistence phase has been pushed back by roughly two weeks. I adopted mock data as a deliberate interim solution — this allows the entire frontend to function and be demoed while the backend catches up.

The good news is the project is still on track for the overall deadline. Testing will overlap slightly with deployment to make up time, and some advanced features like notifications and historical charting have been moved to a "nice to have" category.

---

## SLIDE 19 — Summary & Next Steps (~1 minute)

To summarise what's been achieved: I have a complete frontend with 7 fully functional pages, working user authentication, the dashboard with daily and weekly summaries, meal prep, workout plans, goals tracking, and the progress monitoring system with the traffic light approach. The codebase is clean, modular, and maintainable.

For next steps: the immediate priority is building the CRUD API routes for meals, workouts, and goals, then migrating the mock data to MongoDB. After that, I'll add user-specific data storage, implement progress history charting, run comprehensive testing, and finally deploy to cloud hosting.

---

## SLIDE 20 — Thank You (~30 seconds)

That wraps up my presentation. Thank you for listening. I'm happy to take any questions about the project, the technical decisions I've made, or the next steps in development.

---

**Total estimated time: ~20 minutes**

### Tips for delivery:
- Speak at a steady pace — don't rush through the diagrams
- On the technical slides (sequence diagram, architecture), take a moment to point at the screen and walk through the flow visually
- On the requirements slides, emphasise what's implemented vs pending — this shows self-awareness about scope
- Keep the timeline slide factual — acknowledge delays honestly and explain how you've mitigated them
- End confidently — the project is in a strong position with a clear path forward

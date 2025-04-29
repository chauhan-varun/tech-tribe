# Tech Tribe - MERN Stack Community Platform

A full-featured MERN (MongoDB, Express.js, React.js, Node.js) community platform with admin panel and public-facing client site.

## Project Overview

Tech Tribe is a community platform that showcases:
- Team members
- Organization information
- Upcoming events
- Founders

The platform consists of three main components:
- **Client**: Public-facing website with dark theme
- **Admin**: Protected admin panel for content management
- **Backend**: RESTful API built with Node.js and Express

## Features

### Client Side
- Modern, responsive design with black/red/white theme
- Home page with featured sections
- Team members listing
- Events page with search/filter
- Founders profiles
- About page with organization information

### Admin Panel
- Secure authentication system
- Dashboard with analytics overview
- CRUD operations for:
  - Team Members management
  - Events management
  - Founders management
  - Organization information

### Backend
- RESTful API with Express.js
- MongoDB database with Mongoose
- JWT authentication for protected routes
- Cloudinary integration for image uploads
- Input validation and error handling

## Tech Stack

- **Frontend**: React.js, React Router, Styled Components, React Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Cloudinary
- **Styling**: CSS-in-JS with Styled Components
- **Package Management**: pnpm

## Project Structure

```
tech-tribe/
├── client/               # Public-facing website
│   ├── public/           # Static files
│   └── src/              # React components and logic
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── context/      # React context
│       ├── utils/        # Utility functions
│       └── assets/       # Images and other assets
│
├── admin/                # Admin panel
│   ├── public/           # Static files
│   └── src/              # React components and logic
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── context/      # React context
│       ├── utils/        # Utility functions
│       └── assets/       # Images and other assets
│
└── backend/              # Server API
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    └── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Cloudinary account
- pnpm package manager

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd tech-tribe
```

2. Install dependencies for all parts of the application:
```
# Backend
cd backend
pnpm install

# Client
cd ../client
pnpm install

# Admin
cd ../admin
pnpm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the development servers:
```
# Backend
cd backend
pnpm run dev

# Client (in a new terminal)
cd client
pnpm run dev

# Admin (in a new terminal)
cd admin
pnpm run dev
```

5. Access the applications:
   - Backend API: http://localhost:5000
   - Client website: http://localhost:5173
   - Admin panel: http://localhost:5174

## Database Models

### Team Members
- teamName: String
- role: String
- image: Cloudinary URL

### Organization
- title: String
- image: Cloudinary URL
- description: Text

### Events
- eventTitle: String
- description: Text
- date: Date
- time: Time
- location: String
- price: String

### Founders
- name: String
- role: String
- image: Cloudinary URL
- description: Text (optional)

### Users (Admin)
- username: String
- email: String
- password: String (hashed)
- role: String

## API Endpoints

### Authentication
- POST /api/users/register - Register a new admin
- POST /api/users/login - Login and get JWT token
- GET /api/users/profile - Get current user profile

### Team Members
- GET /api/team-members - Get all team members
- GET /api/team-members/:id - Get a single team member
- POST /api/team-members - Create a new team member (protected)
- PUT /api/team-members/:id - Update a team member (protected)
- DELETE /api/team-members/:id - Delete a team member (protected)

### Organization
- GET /api/organizations - Get all organizations
- GET /api/organizations/:id - Get a single organization
- POST /api/organizations - Create a new organization (protected)
- PUT /api/organizations/:id - Update an organization (protected)
- DELETE /api/organizations/:id - Delete an organization (protected)

### Events
- GET /api/events - Get all events
- GET /api/events/:id - Get a single event
- POST /api/events - Create a new event (protected)
- PUT /api/events/:id - Update an event (protected)
- DELETE /api/events/:id - Delete an event (protected)

### Founders
- GET /api/founders - Get all founders
- GET /api/founders/:id - Get a single founder
- POST /api/founders - Create a new founder (protected)
- PUT /api/founders/:id - Update a founder (protected)
- DELETE /api/founders/:id - Delete a founder (protected)

## License

This project is licensed under the MIT License.

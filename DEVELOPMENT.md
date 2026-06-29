# 🚀 Development Setup Guide

## Prerequisites

- **Bun** package manager
- **Docker** and **Docker Compose**
- **Node.js** 18+

## Quick Start

### 1. Start the Database

```bash
# Start PostgreSQL database
bun run docker:up

# Wait for database to be ready, then setup tables
bun run db:setup
```

### 2. Start the Development Server

```bash
# Start Next.js development server
bun run dev
```

### 3. Access the Application

- **Main App**: http://localhost:3000
- **Database Admin** (optional): http://localhost:8080
- **Drizzle Studio**: `bun run db:studio`

## Database Commands

```bash
# Start/stop database
bun run docker:up     # Start PostgreSQL
bun run docker:down   # Stop PostgreSQL

# Schema management
bun run db:generate   # Generate migrations
bun run db:push       # Push schema to database
bun run db:setup      # Run migrations + seed data
bun run db:studio     # Open Drizzle Studio
```

## Demo Sync

```bash
# Sync demo files once
bun run sync-demo

# Watch for demo changes
bun run sync-demo:watch
```

## Development Workflow

### 1. **Database Changes**
1. Modify schema in `lib/db/schema.ts`
2. Generate migration: `bun run db:generate`
3. Apply changes: `bun run db:push`

### 2. **Authentication Testing**
- **Test User**: `test@idees3d.fr` (created automatically in dev)
- **New Registration**: Use the `/register` page
- **Login/Logout**: Full flow implemented

### 3. **Protected Routes**
- `/dashboard/*` - Requires authentication
- `/login`, `/register` - Redirects if authenticated
- Middleware handles all redirections automatically

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/idees3d"

# Auth
BETTER_AUTH_SECRET="your-super-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# App
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

## Architecture Overview

### Authentication Flow
```
Landing → Login/Register → Dashboard
       ↓
    Guest Access → Planner (Phase 1)
```

### Database Schema
```
Users ← Sessions (Better Auth)
  ↓
UserPreferences
  ↓
FloorPlans → PlanVersions (Phase 2)
  ↓
GuestSessions (Temporary storage)
```

### Security Features
- ✅ **Route Protection**: Middleware-based authentication
- ✅ **Session Management**: Better Auth with database sessions
- ✅ **CSRF Protection**: Built-in with Better Auth
- ✅ **Password Hashing**: Automatic with Better Auth
- ✅ **Type Safety**: Full TypeScript coverage

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# Restart database
bun run docker:down
bun run docker:up

# Reset database
bun run docker:down
docker volume rm main_postgres_data
bun run docker:up
bun run db:setup
```

### Auth Issues
```bash
# Clear browser cookies and localStorage
# Check environment variables
# Restart development server
```

### Demo Integration Issues
```bash
# Re-sync demo files
bun run sync-demo

# Check if demo files exist
ls -la public/planner/
```

## Production Checklist

- [ ] Set `BETTER_AUTH_SECRET` to a secure random string
- [ ] Set `requireEmailVerification: true` in auth config
- [ ] Configure production database URL
- [ ] Set up proper CORS origins
- [ ] Enable HTTPS only cookies

---

## 🎯 Phase 1 Status: COMPLETE ✅

- ✅ **Authentication System**: Registration, login, logout
- ✅ **Protected Routes**: Middleware-based security  
- ✅ **Database**: PostgreSQL + Drizzle ORM
- ✅ **User Management**: Sessions, preferences, profiles
- ✅ **Demo Integration**: Seamless planner access
- ✅ **Beautiful UI**: Golden orange theme (#F5A841), responsive design

**Ready for Phase 2 development!** 🚀
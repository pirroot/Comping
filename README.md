# Full-Stack Application (API + UI)

A complete full-stack web application with a **NestJS backend** and a **Next.js frontend**, organized as a **pnpm monorepo**.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Project Overview

This repository contains a complete full-stack application with two main components:

- **API**: Backend RESTful API built with NestJS and Prisma ORM
- **UI**: Modern frontend built with Next.js (App Router) and Tailwind CSS

The project uses a **monorepo** structure managed by **pnpm workspaces** for efficient dependency management and code sharing.

---

## 🛠 Tech Stack

### Backend (`/api`)

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| **NestJS**     | Backend framework           |
| **Prisma**     | ORM for database operations |
| **TypeScript** | Programming language        |
| **ESLint**     | Code linting                |
| **Prettier**   | Code formatting             |
| **Docker**     | Containerization            |
| **PostgreSQL** | Default database            |

### Frontend (`/ui`)

| Technology       | Purpose                         |
| ---------------- | ------------------------------- |
| **Next.js 15**   | React framework with App Router |
| **Tailwind CSS** | Utility-first CSS framework     |
| **Zustand**      | State management                |
| **TypeScript**   | Programming language            |
| **ESLint**       | Code linting                    |
| **Axios**        | HTTP client                     |

### Monorepo

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| **pnpm**       | Package manager with workspace support |
| **TypeScript** | Shared TypeScript configuration        |

---

## 📁 Project Structure

```
project-root/
│
├── api/                           # Backend NestJS application
│   ├── dist/                      # Compiled JavaScript output
│   ├── node_modules/              # Dependencies
│   ├── prisma/                    # Prisma schema and migrations
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Migration files
│   ├── src/                       # Source code
│   │   ├── modules/               # Feature modules
│   │   ├── common/                # Shared utilities
│   │   ├── config/                # Configuration
│   │   ├── main.ts                # Application entry point
│   │   └── app.module.ts          # Root module
│   ├── uploads/                   # Uploaded files storage
│   ├── .env                       # Environment variables (local)
│   ├── .env.example               # Environment variables example
│   ├── .gitignore                 # Git ignore file
│   ├── .prettierrc                # Prettier configuration
│   ├── docker-compose.yml         # Docker Compose configuration
│   ├── eslint.config.mjs          # ESLint configuration
│   ├── nest-cli.json              # NestJS CLI configuration
│   ├── package.json               # Dependencies and scripts
│   ├── pnpm-lock.yaml             # Lockfile for pnpm
│   ├── pnpm-workspace.yaml        # Workspace configuration
│   ├── skills-lock.json           # Skills lock file
│   ├── tsconfig.build.json        # TypeScript build config
│   ├── tsconfig.json              # TypeScript config
│   └── webpack.config.js          # Webpack configuration
│
├── ui/                            # Frontend Next.js application
│   ├── .next/                     # Next.js build output
│   ├── app/                       # App Router pages and layouts
│   │   ├── (auth)/                # Authentication routes
│   │   ├── api/                   # API routes (if any)
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # Shadcn/ui components
│   │   └── custom/                # Custom components
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility libraries
│   │   └── utils.ts               # Helper functions
│   ├── node_modules/              # Dependencies
│   ├── providers/                 # Context providers
│   ├── public/                    # Static assets
│   │   ├── images/                # Images
│   │   └── fonts/                 # Fonts
│   ├── services/                  # API service clients
│   ├── stores/                    # Zustand state stores
│   ├── styles/                    # Global styles
│   ├── utils/                     # Helper functions
│   ├── .env                       # Environment variables (local)
│   ├── .gitignore                 # Git ignore file
│   ├── components.json            # Shadcn/ui configuration
│   ├── eslint.config.mjs          # ESLint configuration
│   ├── next-env.d.ts              # Next.js type definitions
│   ├── next.config.ts             # Next.js configuration
│   ├── package.json               # Dependencies and scripts
│   ├── pnpm-lock.yaml             # Lockfile for pnpm
│   ├── pnpm-workspace.yaml        # Workspace configuration
│   ├── postcss.config.mjs         # PostCSS configuration
│   ├── proxy.ts                   # Proxy configuration
│   └── tsconfig.json              # TypeScript config
│
├── .gitignore                     # Root Git ignore
├── compose.docker.txt             # Docker Compose examples
├── package.json                   # Root package.json
├── pnpm-workspace.yaml            # Root workspace definition
└── README.md                      # Project documentation
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.17.0 or later ([Download](https://nodejs.org/))
- **pnpm** v8.0.0 or later ([Installation Guide](https://pnpm.io/installation))
- **Docker** and **Docker Compose** (optional, for database container)
- **PostgreSQL** (if not using Docker)
- **Git** ([Download](https://git-scm.com/))

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-project.git
cd your-project
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

#### API

```bash
cd api
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_db"

# Server
PORT=3000
NODE_ENV=development

# JWT (if using authentication)
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
```

#### UI

```bash
cd ui
cp .env.example .env  # If exists, otherwise create .env
```

Edit `.env`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

### 4. Set Up Database

#### Using Docker (Recommended)

```bash
cd api
docker-compose up -d
```

#### Using Local PostgreSQL

```bash
# Create database
createdb your_db
```

### 5. Run Database Migrations

```bash
cd api
pnpm prisma migrate dev --name init
pnpm prisma generate
```

---

## 🏃 Running the Application

### Development Mode

Run both API and UI concurrently from the root:

```bash
pnpm dev
```

Or run individually:

#### Run API Only

```bash
cd api
pnpm start:dev
# API runs on http://localhost:3000
```

#### Run UI Only

```bash
cd ui
pnpm dev
# UI runs on http://localhost:3001
```

### Production Mode

#### Build the Applications

```bash
# Build API
cd api
pnpm build

# Build UI
cd ui
pnpm build
```

#### Start in Production

```bash
# Start API
cd api
pnpm start:prod

# Start UI
cd ui
pnpm start
```

---

## 📜 Available Scripts

### Root

| Script     | Description                             |
| ---------- | --------------------------------------- |
| `pnpm dev` | Run both API and UI in development mode |

### API (`/api`)

| Script                    | Description                       |
| ------------------------- | --------------------------------- |
| `pnpm start:dev`          | Start NestJS in watch mode        |
| `pnpm build`              | Build the API for production      |
| `pnpm start:prod`         | Run the built API in production   |
| `pnpm start:debug`        | Start in debug mode               |
| `pnpm lint`               | Run ESLint                        |
| `pnpm format`             | Format code with Prettier         |
| `pnpm test`               | Run tests                         |
| `pnpm test:watch`         | Run tests in watch mode           |
| `pnpm test:cov`           | Run tests with coverage           |
| `pnpm test:e2e`           | Run E2E tests                     |
| `pnpm prisma studio`      | Open Prisma Studio (database GUI) |
| `pnpm prisma migrate dev` | Create and apply migrations       |
| `pnpm prisma generate`    | Generate Prisma client            |
| `pnpm prisma db seed`     | Seed the database                 |

### UI (`/ui`)

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `pnpm dev`        | Start Next.js in development mode |
| `pnpm build`      | Build for production              |
| `pnpm start`      | Start production server           |
| `pnpm lint`       | Run ESLint                        |
| `pnpm format`     | Format code with Prettier         |
| `pnpm type-check` | Run TypeScript type checking      |

---

## 🐳 Docker Setup

### API with Docker Compose

The API includes a `docker-compose.yml` file for running the database:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: your_db
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

Start the database:

```bash
cd api
docker-compose up -d
```

Stop the database:

```bash
docker-compose down
```

### Full Application with Docker

Create a `docker-compose.yml` at the root for full deployment:

```yaml
version: '3.8'
services:
  api:
    build: ./api
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/your_db
    depends_on:
      - postgres

  ui:
    build: ./ui
    ports:
      - '3001:3000'
    environment:
      NEXT_PUBLIC_API_URL: http://api:3000/api

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: your_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

---

## 🔐 Environment Variables

### API Variables

| Variable         | Description                          | Required | Default     |
| ---------------- | ------------------------------------ | -------- | ----------- |
| `DATABASE_URL`   | PostgreSQL connection string         | ✅       | -           |
| `PORT`           | API server port                      | ❌       | 3000        |
| `NODE_ENV`       | Environment (development/production) | ❌       | development |
| `JWT_SECRET`     | Secret key for JWT tokens            | ✅       | -           |
| `JWT_EXPIRES_IN` | JWT expiration time                  | ❌       | 7d          |
| `SALT_ROUNDS`    | Bcrypt salt rounds                   | ❌       | 10          |

### UI Variables

| Variable              | Description      | Required | Default                   |
| --------------------- | ---------------- | -------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | API endpoint URL | ✅       | http://localhost:3000/api |
| `NEXT_PUBLIC_APP_URL` | Application URL  | ❌       | http://localhost:3001     |

---

## 🗄️ Database

### Prisma Commands

```bash
# Create a new migration
pnpm prisma migrate dev --name migration_name

# Apply migrations in production
pnpm prisma migrate deploy

# Generate Prisma Client
pnpm prisma generate

# Open Prisma Studio (GUI)
pnpm prisma studio

# Seed the database
pnpm prisma db seed

# Reset database
pnpm prisma migrate reset

# Introspect existing database
pnpm prisma db pull
```

### Database Schema Example

```prisma
// api/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🧪 Testing

### API Tests

```bash
cd api

# Unit tests
pnpm test

# Test in watch mode
pnpm test:watch

# Test with coverage
pnpm test:cov

# E2E tests
pnpm test:e2e
```

### UI Tests

```bash
cd ui

# Run tests (if configured)
pnpm test

# Run tests in watch mode
pnpm test:watch
```

---

## 🚢 Deployment

### API Deployment

#### Deploy to Vercel/Railway/Heroku

```bash
cd api
pnpm build
# Use the platform's deployment process
```

#### Deploy with Docker

```bash
cd api
docker build -t your-api .
docker run -p 3000:3000 your-api
```

#### Deploy to AWS EC2

```bash
# Build the application
pnpm build

# Copy files to server
scp -r dist/ user@your-server:/path/to/app
scp package.json user@your-server:/path/to/app
scp pnpm-lock.yaml user@your-server:/path/to/app

# Install dependencies on server
ssh user@your-server
cd /path/to/app
pnpm install --production
pnpm start:prod
```

### UI Deployment

#### Deploy to Vercel (Recommended)

```bash
cd ui
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

#### Deploy to Netlify

```bash
cd ui
pnpm build
# Upload the .next folder to Netlify
```

#### Deploy to AWS S3/CloudFront

```bash
cd ui
pnpm build
# Upload the .next folder to S3 bucket
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Coding Guidelines

- Use TypeScript for all files
- Follow ESLint and Prettier rules
- Write meaningful commit messages
- Add tests for new features
- Update documentation when needed

### Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

- **Project Maintainer**: [Your Name](mailto:your.email@example.com)
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Project URL**: [https://github.com/yourusername/your-project](https://github.com/yourusername/your-project)

---

## 🙏 Acknowledgments

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [pnpm Documentation](https://pnpm.io/)
- [Shadcn/ui](https://ui.shadcn.com/) (if using)

---

## ⚠️ Troubleshooting

### Common Issues

#### Prisma: `Can't reach database server`

- Ensure PostgreSQL is running: `docker ps` or `sudo systemctl status postgresql`
- Verify `DATABASE_URL` is correct in `.env`

#### Next.js: `Module not found`

- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

#### pnpm: `Lockfile is not up-to-date`

- Run `pnpm install --frozen-lockfile` or `pnpm update`

#### Port already in use

- API: Change `PORT` in `.env`
- UI: Run `pnpm dev --port 3002` or change `next.config.ts`

---

## 📊 Performance Monitoring

### Recommended Tools

- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: Performance monitoring
- **Prometheus + Grafana**: Metrics and visualization

---

## 🔒 Security Best Practices

- Never commit `.env` files to version control
- Use HTTPS in production
- Implement rate limiting
- Sanitize user inputs
- Use parameterized queries (Prisma does this by default)
- Implement JWT expiration and refresh tokens
- Enable CORS only for trusted origins
- Use Helmet for security headers

---

**Made with ❤️ by the Development Team**

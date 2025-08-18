# Express.js TypeScript Template

A modern Express.js server template built with TypeScript and Bun as the package manager.

## Features

- ⚡ **Bun** - Fast package manager and runtime
- 🚀 **Express.js** - Web framework for Node.js
- 📘 **TypeScript** - Type-safe JavaScript
- 🌐 **CORS** - Configured with environment-based origin
- 🔄 **Hot Reload** - Development server with file watching
- 📁 **Structured** - Organized route structure

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Install dependencies:
```bash
bun install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=3000
NODE_ENV=development
SITE_URL=http://localhost:3000
```

### Development

Start the development server with hot reload:
```bash
bun run dev
```

The server will start at `http://localhost:3000`

### Production

Build and start the production server:
```bash
bun run build
bun run start
```

### Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build the application
- `bun run start` - Start the production server
- `bun run type-check` - Run TypeScript type checking

## API Endpoints

- `GET /` - Server status and information
- `GET /health` - Health check endpoint
- `GET /api/users` - Get users list
- `POST /api/users` - Create a new user

## Project Structure

```
src/
├── index.ts          # Main server file
└── routes/
    └── api.ts         # API routes
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `SITE_URL` - URL for CORS configuration

## CORS Configuration

CORS is configured to accept requests from the URL specified in the `SITE_URL` environment variable. Make sure to update this in your `.env` file for your specific domain.


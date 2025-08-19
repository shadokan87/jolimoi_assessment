# Jolimoi Assessment

This monorepo contains two main projects:

- **express/**: Backend API built with Express and Bun
- **vue/**: Frontend application built with Vue 3 and Vite

## Prerequisites

- [Bun](https://bun.com/) (required for backend)
- Node.js >= 20.0 (for frontend)

## Setup

Install dependencies for both projects:

```sh
# From the root directory
cd express && bun install
cd ../vue && bun install
```

## Running the Projects

### Backend (Express)

Start the backend server (with Bun):

```sh
cd express
bun run dev
```
### Frontend (Vue)

Start the frontend dev server:

```sh
cd vue
bun run dev
```

## Notes

- Make sure Bun is installed and available in your PATH for backend commands.
- The frontend can be run with Bun or Node.js, but Bun is recommended for consistency.

# Next.js RBAC Dashboard

## About This Project

This project is a modern educational dashboard built with the latest Next.js (App Router), TypeScript, and Prisma ORM. It demonstrates real-world concepts like authentication, role-based access control (RBAC), protected API routes, and state management using React Query and Zustand.

### Main Features

- **Authentication**: Secure login with JWT and refresh tokens.
- **RBAC Middleware**: Role-based access for User, Admin, and Moderator.
- **Protected Pages**: Users, Products, and Todos management.
- **API Routes**: RESTful endpoints for all entities.
- **State Management**: React Query for server state, Zustand for client state.
- **Prisma ORM**: Modern database access with migrations and type safety.
- **TailwindCSS**: Clean, responsive, and modern UI.
- **Error Handling**: Custom error pages and boundaries.
- **Educational Structure**: Clear folder structure, modular code, and best practices.

### Tools & Technologies Used

- **Next.js 14 (App Router)**
- **TypeScript**
- **Prisma ORM** (with SQLite)
- **React Query**
- **Zustand**
- **TailwindCSS**
- **JWT (jsonwebtoken)**
- **bcrypt** (for password hashing)
- **cookie** (for cookie management)

### Why is it a Good Educational Project?

- Covers full-stack concepts (frontend, backend, database, authentication).
- Uses modern, in-demand technologies.
- Demonstrates real-world patterns (RBAC, API, state management).
- Modular and scalable codebase.
- Easy to extend (add more roles, entities, or features).
- Prepares you for real SaaS/dashboard projects.

---

## Features

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM with SQLite (default)
- React Query & Zustand for state management
- RBAC Middleware (User, Admin, Moderator)
- Authentication (Login, JWT, Refresh Token)
- Protected pages: Users, Products, Todos
- API Routes for all entities
- Modern UI with TailwindCSS

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Seed data (optional)

You can add demo data using `src/lib/seed.js` if available.

### 5. Environment variables

Create a `.env` file in the root with:

```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET=your_jwt_secret
```

## Project Structure

- `src/app` : Next.js pages (App Router)
- `src/app/api` : API routes (users, products, todos, auth)
- `src/middleware.ts` : RBAC middleware
- `src/lib` : Prisma and auth utilities
- `src/store` : Zustand & React Query state
- `src/Hooks` : React hooks
- `src/Components` : UI components
- `prisma/schema.prisma` : Database schema

## Roles & Permissions

- **User**: Access to `/users`
- **Admin**: Access to `/todos`
- **Moderator**: Access to `/products`

## Contributing

Pull requests and suggestions are welcome!

## License

MIT
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

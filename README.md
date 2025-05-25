# Auth Server

> Minimal Auth Server

## What's inside

- [Hono](https://hono.dev) - HTTP Framework
- [Better Auth](https://github.com/authc/better-auth) - Authentication Library
- [Drizzle ORM](https://orm.drizzle.team) - Database ORM
- [Turso](https://turso.tech) - Edge Database
- [Cloudflare Workers](https://workers.cloudflare.com) - Serverless Platform

## Development

| Description | Command |
|------------|---------|
| Starts the development server locally | `bun run dev` |
| Running database server | `turso dev` |
| Running the tests | `bun test` |
| Applying database migrations | `bun run db:migrate` |
| Generating database schema | `bun run db:generate` |
| Open drizzle studio | `bun run db:studio` |

## Deployment

This project uses [Cloudflare Workers](https://workers.cloudflare.com) to deploy the application.

```
bun run deploy
```

## Default Providers

- Google

## Client

Example of how to use in a React app:

```js
import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    jwtClient()
  ],
  baseURL: process.env.BACKEND_URL,
})

export const signIn = async () => {
  const data = await authClient.signIn.social({
      callbackURL: process.env.CALLBACK_URL,
      provider: "google"
  })
}
```

---

Carlos Costa @ 2025
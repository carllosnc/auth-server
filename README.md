# Auth Server

> A serverless authentication service built to handle user authentication flows.

## What's inside

- Hono
- Better Auth
- Drizzle ORM
- Turso
- Cloudflare Worker

## Development

| Description | Command |
|------------|---------|
| Starts the development server locally | `bun run dev` |
| Running database server | `turso dev` |
| Running the tests | `bun test` |
| Applying database migrations | `bun run --env-file=.dev.vars db:migrate` |
| Generating database schema | `bun run db:generate` |
| Open drizzle studio | `bun run --env-file=.dev.vars db:studio` |

## Default Providers

- Email and Password
- Google

---

Carlos Costa @ 2025
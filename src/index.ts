import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { origins } from './settings/origins'
import { Bindings } from './bindings'
import { betterAuthSettings } from './lib/auth'
const app = new Hono<{Bindings: Bindings}>()

app.get('/', (c) => {
  return c.json({
		project: 'Auth Server',
		version: '0.0.1',
	})
})

app.use(
	"/api/auth/**", // or replace with "*" to enable cors for all routes
	cors({
		origin: [
			...origins
		],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
 )

 app.on(["POST", "GET"], "/api/auth/**", async (c) => {
  const auth = betterAuthSettings({
    tursoUrl: c.env.TURSO_DATABASE_URL,
    tursoToken: c.env.TURSO_AUTH_TOKEN,
    authGoogleId: c.env.AUTH_GOOGLE_ID,
    authGoogleSecret: c.env.AUTH_GOOGLE_SECRET,
  })

  const result = await auth.handler(c.req.raw)
  return result
})

export default app

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { origins } from './settings/origins'
import { Bindings } from './bindings'
import { betterAuthSettings } from './lib/auth'
const app = new Hono<{Bindings: Bindings}>()

app.get('/', (c) => {
	let isEnvSet = false

	if (
		c.env.BETTER_AUTH_SECRET &&
		c.env.BETTER_AUTH_URL &&
		c.env.TURSO_DATABASE_URL &&
		c.env.TURSO_AUTH_TOKEN &&
		c.env.AUTH_GOOGLE_ID &&
		c.env.AUTH_GOOGLE_SECRET
	) {
		isEnvSet = true
	}

  return c.json({
		project: 'Auth Server',
		version: '0.0.1',
		checkEnv: isEnvSet,
	})
})

app.use( "/api/auth/**", async (c, next) => {
	const productionOrigins = c.env.PRODUCTION_ORIGINS.split(',')

	cors({
		origin: [
			...productionOrigins,
			...origins,
		],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	})

	await next()
})

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

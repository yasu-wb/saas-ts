import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.get('/health', (c) => {
    return c.json({ status: 'ok' })
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})

import { Hono } from 'hono'

type Env = {
  KV: KVNamespace;
}

const app = new Hono<Env>()

app.get('/', (c) => c.text('أهلاً بيك في السيرفر بتاعك 🎉'))

app.get('/save/:key/:value', async (c) => {
  const { key, value } = c.req.param()
  await c.env.KV.put(key, value)
  return c.text(`تم الحفظ: ${key} = ${value}`)
})

app.get('/get/:key', async (c) => {
  const { key } = c.req.param()
  const value = await c.env.KV.get(key)
  return c.text(value ?? 'مش لاقي القيمة دي 😢')
})

export default app
import dotenv from 'dotenv'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT || 3000
const TARGET_URL = process.env.SERVER_TARGET_URL
const AUTH_HEADER_NAME = 'X-CMC_PRO_API_KEY'
const AUTH_HEADER_VALUE = process.env.COINMARKET_API_KEY

if (!TARGET_URL || !AUTH_HEADER_VALUE) {
  console.error('TARGET_URL and COINMARKET_API_KEY must be set in .env')
  process.exit(1)
}

// deployed version must have adjusted CORS policy for security
const allowedOrigins = '*'

app.use(
  '/proxy',
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader(AUTH_HEADER_NAME, AUTH_HEADER_VALUE)
      },
      proxyRes: (proxyRes, req, res) => {
        res.setHeader('Access-Control-Allow-Origin', allowedOrigins)
      },
    },
  }),
)

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`)
})

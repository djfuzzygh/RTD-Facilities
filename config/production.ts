export const productionConfig = {
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    },
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  },
  cache: {
    ttl: 60 * 60 * 1000, // 1 hour
    maxSize: 100 // maximum number of items in cache
  },
  logging: {
    level: 'info',
    format: 'json'
  },
  monitoring: {
    enabled: true,
    sampleRate: 0.1 // sample 10% of requests
  }
} 
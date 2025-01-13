import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import fileUpload from 'express-fileupload'
import { createConnection } from 'typeorm'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const requestRoutes = require('./routes/requests')

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(fileUpload())

// Routes
app.use('/api/requests', requestRoutes)

// Error handling
app.use(errorHandler)

const port = process.env.PORT || 3001

async function startServer() {
  try {
    await createConnection()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

startServer() 
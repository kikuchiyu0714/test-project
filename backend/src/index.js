const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')

const app = express()
app.use(cors())

const PORT = process.env.PORT || 4000

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'app_password',
  database: process.env.DB_NAME || 'app_db'
}

async function waitForDb(retries = 20, delayMs = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await mysql.createConnection(dbConfig)
      await connection.end()
      console.log('Connected to MySQL')
      return
    } catch (error) {
      console.log(`MySQL not ready yet (attempt ${attempt}/${retries}): ${error.message}`)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
  throw new Error('Could not connect to MySQL after multiple retries')
}

app.get('/api/health', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig)
    const [rows] = await connection.query('SELECT NOW() AS now')
    await connection.end()
    res.json({ status: 'ok', dbConnected: true, dbTime: rows[0].now })
  } catch (error) {
    console.error('Health check failed:', error)
    res.status(500).json({ status: 'error', dbConnected: false, error: error.message })
  }
})

waitForDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })

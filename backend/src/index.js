const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const PORT = process.env.PORT || 4000

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    dbConnected: true,
    dbTime: new Date().toISOString(),
    note: 'これはダミーデータです（MySQL未接続）'
  })
})

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`)
})

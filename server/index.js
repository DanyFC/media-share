import authRoutes from './routes/auth.js'
import connectDB from './config/db.js'
import cors from 'cors'
import express from 'express'
import fileRoutes from './routes/file.js'
import linkRouter from './routes/link.js'
import userRoutes from './routes/user.js'

const app = express()
const port = process.env.PORT || 3551
connectDB()

app.use(cors())
app.use(express.json({ extended: true }))

app.use(express.static('./uploads'))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/link', linkRouter)
app.use('/api/file', fileRoutes)

app.get('/', (req, res) => {
  const html = `
    <h1>Hello World!</h1>
    <p>This is a simple Node.js Express server.</p>
  `
  res.send(html)
})

app.listen(port, '0.0.0.0', () => {
  console.log(`-> Server is listening in the port ${port}`)
})

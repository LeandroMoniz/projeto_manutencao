const express = require('express')
const cors = require('cors')


const app = express()

// Config JSON response 
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images 
app.use(express.static('public'))

// Routes
const loginRoutes = require('./routes/loginRoutes')


app.use('/logins', loginRoutes)


app.listen(5000) // 5000 para o backend e 3000 para frontend
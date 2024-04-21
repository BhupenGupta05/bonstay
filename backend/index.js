require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { unknownEndpoint, errorHandler, requestLogger, tokenExtractor, userExtractor } = require('./utils/middleware')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const profileRouter = require('./controllers/profile')
const uploadRouter = require('./controllers/uploadByLink')
const uploadDeviceRouter = require('./controllers/uploadByDevice')
const placesRouter = require('./controllers/places')
const userPlacesRouter = require('./controllers/userPlaces')
const bookingsRouter = require('./controllers/bookings')


const url = process.env.MONGODB_URL
console.log('connecting to', url)
mongoose.set('strictQuery', false)


mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))


app.use(express.static('dist'))
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(requestLogger)

app.use('/api/register', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/places', placesRouter)

app.use('/api/profile', tokenExtractor, userExtractor, profileRouter)
app.use(tokenExtractor)
app.use('/api/uploadLink', uploadRouter)
app.use('/api/uploadDevice', uploadDeviceRouter)
app.use('/api/account/places', userExtractor, placesRouter)
app.use('/api/account/bookings', userExtractor, bookingsRouter)
app.use('/api/user-places', userExtractor, userPlacesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
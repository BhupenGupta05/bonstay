const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '')
      request.token = token
    } else {
      request.token = null
    }
    next()
  }

  const userExtractor = async (request, response, next) => {
    const token = request.token
  
    if (!token) {
      return response.status(401).json({ error: 'token missing' })
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decodedToken)
  
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
  
      const user = await User.findById(decodedToken.id)
  
      if (!user) {
        return response.status(401).json({ error: 'user not found' })
      }
  
      request.user = user
      next()
    } catch (error) {
      return response.status(401).json({ error: 'token invalid' })
    }
  }

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {    
      return response.status(401).json({ error: 'token invalid' })  
    }
  
    next(error)
  }

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}
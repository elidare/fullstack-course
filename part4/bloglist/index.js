const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

// Handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Handler of requests with result to errors
app.use(errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

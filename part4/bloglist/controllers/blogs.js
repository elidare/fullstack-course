const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1 })
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'UserId missing or not valid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const newBlog = request.body
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    blog.title = newBlog.title
    blog.url = newBlog.url
    blog.author = newBlog.author
    blog.likes = newBlog.likes

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter

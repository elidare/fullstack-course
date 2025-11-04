const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

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

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user

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
    const returnedBlog = await Blog
      .findById(savedBlog.id)
      .populate('user', { username: 1, name: 1 })

    response.status(201).json(returnedBlog)

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)

    if (blogToDelete.user.toString() !== user.id.toString()) {
      return response.status(400).json({ error: 'A blog can be deleted only by user who created it' })
    }

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

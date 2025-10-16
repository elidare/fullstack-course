const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('Blogs api get', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('Identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    assert.ok(response.body[0].id)
    assert.ok(!response.body[0]._id)
  })
})

describe('Blogs api post', () => {
  test('New blog is created', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    // Save new blog
    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')
    const { title, author, url, likes } = response.body[2]

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert.strictEqual(title, newBlog.title)
    assert.strictEqual(author, newBlog.author)
    assert.strictEqual(url, newBlog.url)
    assert.strictEqual(likes, newBlog.likes)
  })

  test('If likes is missing, set default', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    }

    // Save new blog
    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[2].likes, 0)
  })

  test('If title is missing, it returns Bad request', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    }

    // Save new blog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('If url is missing, it returns Bad request', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin'
    }

    // Save new blog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})

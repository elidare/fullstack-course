const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Getting blogs', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('Identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    assert.ok(response.body[0].id)
    assert.ok(!response.body[0]._id)
  })
})

describe('Getting one blog', () => {
  test('Gets a blog for a valid id', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToView = initialBlogs[0]

    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(result.body, blogToView)
  })

  test('returns 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('returns 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('Adding new blog', () => {
  test('New blog is created with valid data', async () => {
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
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentBlogs = await helper.blogsInDb()
    const { title, author, url, likes } = currentBlogs[2]

    assert.strictEqual(currentBlogs.length, helper.initialBlogs.length + 1)
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
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentBlogs = await helper.blogsInDb()
    assert.strictEqual(currentBlogs[2].likes, 0)
  })

  test('If title is missing, it returns 400 Bad request', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    }

    // Save new blog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const currentBlogs = await helper.blogsInDb()
    assert.strictEqual(currentBlogs.length, helper.initialBlogs.length)
  })

  test('If url is missing, it returns 400 Bad request', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin'
    }

    // Save new blog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const currentBlogs = await helper.blogsInDb()
    assert.strictEqual(currentBlogs.length, helper.initialBlogs.length)
  })
})

describe('Deleting a blog', () => {
  test('Deletes with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

describe('Updating a blog', () => {
  test('Updating a blog with valid data is successful', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlogData = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlogData)
      .expect(200)

    const currentBlogs = await helper.blogsInDb()
    const { title, author, url, likes } = currentBlogs[0]

    assert.strictEqual(currentBlogs.length, helper.initialBlogs.length)
    assert.strictEqual(title, newBlogData.title)
    assert.strictEqual(author, newBlogData.author)
    assert.strictEqual(url, newBlogData.url)
    assert.strictEqual(likes, newBlogData.likes)
  })

  test('Updating non-existant blog returns 404', async () => {
    const validNonexistingId = await helper.nonExistingId()

    const newBlogData = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(newBlogData)
      .expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})

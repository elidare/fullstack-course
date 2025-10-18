const assert = require('node:assert')
const bcrypt = require('bcrypt')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const newUsers = await Promise.all(helper.initialUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10)

    return {
      username: user.username,
      passwordHash: passwordHash
    }
  }))

  await User.insertMany(newUsers)
})

describe('Adding new user', () => {
  test('If username is missing, it returns 400 Bad request', async () => {
    const newUser = {
      password: "pswd"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const currentUsers = await helper.usersInDb()
    assert.strictEqual(currentUsers.length, helper.initialUsers.length)
    assert(result.body.error.includes('Path `username` is required'))
  })

  test('If username is less than minimum, it returns 400 Bad request', async () => {
    const newUser = {
      username: "t",
      password: "pswd"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const currentUsers = await helper.usersInDb()
    assert.strictEqual(currentUsers.length, helper.initialUsers.length)
    assert(result.body.error.includes(`Path \`username\` (\`${newUser.username}\`, length ${newUser.username.length}) is shorter than the minimum allowed length`))
  })

  test('If password is missing, it returns 400 Bad request', async () => {
    const newUser = {
      username: "test_user_new"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const currentUsers = await helper.usersInDb()
    assert.strictEqual(currentUsers.length, helper.initialUsers.length)
    assert(result.body.error.includes('Password is required'))
  })

  test('If password is less than minimum, it returns 400 Bad request', async () => {
    const newUser = {
      username: "test_user_new",
      password: "ps"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const currentUsers = await helper.usersInDb()
    assert.strictEqual(currentUsers.length, helper.initialUsers.length)
    assert(result.body.error.includes('Password should be at least 3 characters long'))
  })

  test('If username is not unique, it returns 400 Bad request', async () => {
    const currentUsers = await helper.usersInDb()
    const newUser = {
      username: currentUsers[0].username,
      password: 'pswd'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const currentUsersAtEnd = await helper.usersInDb()
    assert.strictEqual(currentUsersAtEnd.length, helper.initialUsers.length)
    assert(result.body.error.includes('expected `username` to be unique'))
  })
})

after(async () => {
  await mongoose.connection.close()
})

// Get all, Get one
// Create successfully

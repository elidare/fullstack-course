require('dotenv').config()

const mongoose = require('mongoose')

if (process.argv.length < 1) {
  process.exit(1)
}

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const addBlog = (title, author, url, likes) => {
  const blog = new Blog({
    title,
    author,
    url,
    likes,
  })

  blog.save()
    .then(() => {
      mongoose.connection.close()
    })
}

const showAll = () => {
  Blog.find({}).then((blogs) => {
    console.log('Blogs:')
    blogs.forEach(blog => {
      console.log(blog.title, blog.author, blog.url, blog.likes)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 2) {
  showAll()
} else if (process.argv.length === 6) {
  const title = process.argv[2]
  const author = process.argv[3]
  const url = process.argv[4]
  const likes = process.argv[5]
  title, author, url, likes

  addBlog(title, author, url, likes)
} else {
  mongoose.connection.close()
}

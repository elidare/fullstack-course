const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogList.reduce(reducer, 0)
}

const favoriteBlog = (blogList) => {
  // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-a-property-in-an-array-of-objects
  const reducer = (previos, current) => {
    return (previos && previos.likes >= current.likes) ? previos : current
  }

  return blogList.reduce(reducer, {})
}

const mostBlogs = (blogList) => {
  // https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
  const most = _.countBy(blogList, 'author')
  const maxAuthor = _.maxBy(_.keys(most), (o) => most[o])
  return maxAuthor ? { author: maxAuthor, blogs: most[maxAuthor] } : {}
}

const mostLikes = (blogList) => {
  const mostGrouped = _.groupBy(blogList, 'author')
  const mostByLikes = _.mapValues(mostGrouped, (o) => _.sumBy(o, 'likes'))
  const maxAuthor = _.maxBy(_.keys(mostByLikes), (o) => mostByLikes[o])
  return maxAuthor ? { author: maxAuthor, likes: mostByLikes[maxAuthor] } : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

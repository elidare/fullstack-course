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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

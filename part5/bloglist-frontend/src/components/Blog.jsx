import { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={() => setBlogInfoVisible(true)}>View</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={() => setBlogInfoVisible(false)}>Hide</button>
          <br />
          {blog.url}<br />
          Likes&nbsp;{blog.likes}
          <button>Like</button><br />
          {blog.user.name}
        </div>
      </div>
    </>
  )
}

export default Blog

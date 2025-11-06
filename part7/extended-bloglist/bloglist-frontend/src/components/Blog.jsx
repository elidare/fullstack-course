import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const updateLikes = () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const remove = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <div>
        <h1 className="blog-summary">
          {blog.title} {blog.author}
        </h1>
        <div>
          <span>
            <a href={blog.url}>{blog.url}</a>
          </span>
          <br />
          <span>Likes&nbsp;{blog.likes}</span>
          <button onClick={() => updateLikes()}>Like</button>
          <br />
          <span>Added by {blog.user.name}</span>
          <br />
          {user && user.username === blog.user.username && (
            <button onClick={() => remove()}>Delete</button>
          )}
        </div>
      </div>
    </>
  )
}

export default Blog

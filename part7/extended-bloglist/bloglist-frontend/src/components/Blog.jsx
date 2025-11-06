import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, updateComments, user }) => {
  const [comment, setComment] = useState('')

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

  const addComment = (event) => {
    event.preventDefault()
    updateComments(blog.id, comment)
    setComment('')
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
          <h3>Comments</h3>
          <form onSubmit={addComment}>
            <label>
              <input
                type="text"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
            </label>
            <button type="submit">Add comment</button>
          </form>
          {blog.comments && (
            <ul>
              {blog.comments.map((c) => (
                <li key={c.id}>{c.comment}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default Blog

import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const submitForm = (event) => {
    event.preventDefault()

    handleSubmit({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submitForm}>
        <label>
          Title&nbsp;
          <input 
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </label>
        <br />
        <label>
          Author&nbsp;
          <input 
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </label>
        <br />
        <label>
          Url&nbsp;
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm

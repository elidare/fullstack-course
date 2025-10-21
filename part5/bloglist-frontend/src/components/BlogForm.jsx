const BlogForm = ({
   handleSubmit,
   handleBlogTitleChange,
   handleBlogAuthorChange,
   handleBlogUrlChange,
   blogTitle,
   blogAuthor,
   blogUrl
  }) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title&nbsp;
          <input 
            type="text"
            value={blogTitle}
            onChange={handleBlogTitleChange}
          />
        </label>
        <br />
        <label>
          Author&nbsp;
          <input 
            type="text"
            value={blogAuthor}
            onChange={handleBlogAuthorChange}
          />
        </label>
        <br />
        <label>
          Url&nbsp;
          <input
            type="text"
            value={blogUrl}
            onChange={handleBlogUrlChange}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm

import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false);

  const hideWhenVisible = { display: blogInfoVisible ? "none" : "" };
  const showWhenVisible = { display: blogInfoVisible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateLikes = () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    updateBlog(blog.id, updatedBlog);
  };

  const remove = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <>
      <div style={blogStyle}>
        <span className="blog-summary">
          {blog.title} {blog.author}
        </span>
        <span style={hideWhenVisible}>
          <button onClick={() => setBlogInfoVisible(true)}>View</button>
        </span>
        <span style={showWhenVisible}>
          <button onClick={() => setBlogInfoVisible(false)}>Hide</button>
        </span>
        <div style={showWhenVisible}>
          <span>{blog.url}</span>
          <br />
          <span>Likes&nbsp;{blog.likes}</span>
          <button onClick={() => updateLikes()}>Like</button>
          <br />
          <span>{blog.user.name}</span>
          <br />
          {user && user.username === blog.user.username && (
            <button onClick={() => remove()}>Delete</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;

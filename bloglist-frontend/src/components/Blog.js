import { useState } from "react";

const Blog = ({ blog, updateLikes, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateLikes(blog.id, blogToUpdate);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div className="blog">
      <div>
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>{" "}
        <button id="view-btn" onClick={toggleVisibility}>
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>URL: {blog.url}</div>
          <div>
            Likes: {blog.likes}{" "}
            <button id="like-btn" onClick={handleLike}>
              Like
            </button>{" "}
          </div>
          <div>Author: {blog.user.name}</div>
          {blog.user.username === username && (
            <button id="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
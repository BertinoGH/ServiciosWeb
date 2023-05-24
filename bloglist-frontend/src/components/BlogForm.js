import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div className="container">

          <div className="form-group">
            <label htmlFor="username">Title</label>
            <input
              name="title"
              type="text"
              value={newBlog.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Author</label>
            <input
              name="author"
              type="text"
              value={newBlog.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">URL</label>
            <input
              name="url"
              type="text"
              value={newBlog.url}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <button id="create-blog-btn" type="submit">
              Create
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default BlogForm;
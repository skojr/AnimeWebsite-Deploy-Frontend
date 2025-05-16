import { useState } from "react";
import "./Posts.css";
import { createPost } from "../../auth/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "content") setContent(value);
  };

  const handleSubmit = async () => {
    try {
        const data = await createPost({ title, content });
    toast.success("Created post successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1500);
    } catch (error) {
        toast.error(error);
    }
  };
  return (
    <div className="post-container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="p-4 rounded shadow-lg bg-light"
        style={{
          maxWidth: "500px",
          width: "100%",
          transform: "scale(1.7)",
          transformOrigin: "center",
        }}
      >
        <h2 className="text-center mb-4">Create a Post</h2>

        <div className="mb-3">
          <label htmlFor="title" className="form-label fs-5">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter the title of your post"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label fs-5">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={handleChange}
            className="form-control"
            rows="5"
            placeholder="Write your post content here..."
            maxLength={250}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100 fs-5">
          Post
        </button>
      </form>
    </div>
  );
};

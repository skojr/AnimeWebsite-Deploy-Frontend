import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../../auth/AuthService";
import { toast } from "react-toastify";

export const EditPost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const data = await getPost(id);
      setPost(data); // Populate the form with the fetched data
    } catch (error) {
      console.error("Failed to fetch post:", error);
      toast.error("Failed to load post data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, post); // Update the post with the new data
      toast.success("Post updated successfully!");
      setTimeout(() => {
        navigate("/posts/my-posts"); // Redirect to the posts page
      }, 2000);
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("Failed to update post.");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <div className="post-container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow-lg bg-light"
        style={{
          maxWidth: "500px",
          width: "100%",
          transform: "scale(1.7)",
          transformOrigin: "center",
        }}
      >
        <h2 className="text-center mb-4">Edit Post</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="4"
            value={post.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Post
        </button>
      </form>
    </div>
  );
};

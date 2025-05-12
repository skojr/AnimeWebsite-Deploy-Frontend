import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../../auth/AuthService";
import { toast } from "react-toastify";

export const PostCards = ({ post }) => {
  const { title, content, id, createdAt, username } = post;
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
        toast.error(error);
    }
  };

  return (
    <div
      className="card mb-3"
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        backgroundColor: "#1e1e2f",
        color: "#d1d1e9",
        border: "1px solid #6c63ff",
        borderRadius: "8px",
      }}
    >
      <div className="card-body">
        <h5
          className="card-title"
          style={{
            color: "#6c63ff",
            fontWeight: "bold",
          }}
        >
          {username}: {title}
        </h5>
        <p
          className="card-text mt-5"
          style={{
            fontSize: "1.7rem",
            color: "#a1a1b5",
          }}
        >
          {new Date(createdAt).toLocaleString()}
        </p>
        <p
          className="card-text"
          style={{ fontSize: "1.8rem", marginTop: "3rem" }}
        >
          {content}
        </p>
      </div>

      <Link
        to={`/posts/edit-post/${id}`}
        className="btn btn-primary mt-3"
        style={{
          fontSize: "2rem",
        }}
      >
        Edit
      </Link>

      <button
        className="btn btn-danger mt-3"
        style={{
          fontSize: "2rem",
        }}
        onClick={handleDeleteClick}
      >
        Delete Post
      </button>
    </div>
  );
};

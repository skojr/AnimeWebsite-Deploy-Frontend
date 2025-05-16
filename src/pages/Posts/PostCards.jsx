import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../../auth/AuthService";
import { toast } from "react-toastify";
import "./Posts.css";

export const PostCards = ({ post }) => {
  const { title, content, id, createdAt, username } = post;
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully!");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="post-card bg-dark p-4">
      <p className="mb-2 fs-4">Posted {createdAt.slice(0, 10)}</p>
      <h3 className="post-title mb-3">{title}</h3>
      <p className="post-content mb-3 fs-3">{content}</p>
      <p className="mb-3 text-secondary fs-3">By {username}</p>
    </div>
  );
};

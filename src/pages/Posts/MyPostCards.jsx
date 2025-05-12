import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../../auth/AuthService";
import { toast } from "react-toastify";
import "./Posts.css";

export const MyPostCards = ({ post }) => {
  const { title, content, id, createdAt, username } = post;
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    toast(
      <div>
        <p>Are you sure you want to delete this post?</p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-danger btn-sm me-2"
            onClick={async () => {
              try {
                await deletePost(id);
                toast.dismiss(); // Dismiss the confirmation toast
                toast.success("Post deleted successfully!");
                setTimeout(() => window.location.reload(), 2000);
              } catch (error) {
                toast.error("Failed to delete post.");
              }
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // Prevent auto-closing
        closeOnClick: false, // Prevent closing on background click
        draggable: false, // Disable dragging
      }
    );
  };

  return (
    <div className="post-card bg-dark p-4">
      <p className="text-secondary mb-2 fs-3">
        Posted {timeSince(new Date(createdAt))} ago
      </p>
      <h3 className="post-title mb-3">{title}</h3>
      <p className="post-content mb-3 fs-3">{content}</p>
      <p className="text-secondary mb-4 fs-3">By {username}</p>
      <Link to={`/posts/edit-post/${id}`} className="fs-3 btn btn-primary me-2">
        Edit Post
      </Link>
      <button onClick={handleDeleteClick} className="fs-3 btn btn-danger">
        Delete
      </button>
    </div>
  );
};

// Helper function to format time difference
const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1500);
  const intervals = [
    { label: "year", value: 31536000 },
    { label: "month", value: 2592000 },
    { label: "week", value: 604800 },
    { label: "day", value: 86400 },
    { label: "hour", value: 3600 },
    { label: "minute", value: 60 },
  ];

  for (let interval of intervals) {
    const count = Math.floor(seconds / interval.value);
    if (count > 0) return `${count} ${interval.label}${count !== 1 ? "s" : ""}`;
  }
  return "just now";
};

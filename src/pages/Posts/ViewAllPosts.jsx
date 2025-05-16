import { useEffect, useState } from "react";
import { getAllPosts } from "../../auth/AuthService";
import { PostCards } from "./PostCards";
import "./Posts.css";

export const ViewAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 4;

  const fetchPosts = async (page) => {
    try {
      const data = await getAllPosts(page, postsPerPage);
      setPosts(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);
      console.log(data);
    } catch (error) {
      console.error("Failed to get posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchPosts(page);
    }
  };

  return (
    <div className="post-container">
      <div className="row">
        {totalPages > 1 && (
          <div className="pagination-controls bg-dark rounded p-3 mt-5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="btn btn-secondary mx-1 fs-3"
              disabled={currentPage === 0}
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`btn mx-1 fs-3 ${
                  currentPage === num ? "btn-primary" : "btn-outline-primary"
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="btn btn-secondary mx-1 fs-3"
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}

        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-lg-12 col-md-12">
              <PostCards post={post} />
            </div>
          ))
        ) : (
          <h5 className="text-center text-light" style={{ fontSize: "2rem" }}>
            No posts found.
          </h5>
        )}

        {totalPages > 1 && (
          <div className="pagination-controls bg-dark rounded p-3 mt-3 mb-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="btn btn-secondary mx-1 fs-3"
              disabled={currentPage === 0}
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`btn mx-1 fs-3 ${
                  currentPage === num ? "btn-primary" : "btn-outline-primary"
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="btn btn-secondary mx-1 fs-3"
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import "./Posts.css";
import { getMyPosts } from "../../auth/AuthService";
import { PostCards } from "./PostCards"; // Import the PostCards component

export const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await getMyPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to get posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-container mt-4">
      <div className="row g-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.id}>
              <PostCards post={post} />
            </div>
          ))
        ) : (
          <h5 className="text-center text-light" style={{fontSize:"7.5rem"}}>No posts found.</h5>
        )}
      </div>
    </div>
  );
};

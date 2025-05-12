import { useEffect, useState } from "react";
import { getAllPosts } from "../../auth/AuthService";
import { PostCards } from "./PostCards";

export const ViewAllPosts = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts)

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
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
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={post.id}>
              <PostCards post={post} />
            </div>
          ))
        ) : (
          <h5 className="text-center text-light" style={{ fontSize: "7.5rem" }}>
            No posts found.
          </h5>
        )}
      </div>
    </div>
  );
};

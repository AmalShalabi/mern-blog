import React, { useState, useEffect } from "react";
import Post from "../components/Post";

const HomePage = () => {
 const [posts, setPosts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);

 const postsPerPage = 4;

 useEffect(() => {
   fetch("http://localhost:4000/post")
     .then((response) => response.json())
     .then((data) => setPosts(data));
 }, []);

 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

 const paginate = (pageNumber) => {
   setCurrentPage(pageNumber);
 };
  return (
    <>
      {currentPosts.length > 0 &&
        currentPosts.map((post) => <Post key={post.id} {...post} />)}

      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default HomePage;

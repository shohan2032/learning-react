import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwriteServices/db&storage";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null); // Renamed to setPost for clarity
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      // Fetch post data using slug
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post); // Update state with the fetched post
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/"); // Redirect if there's an error
        });
    } else {
      navigate("/"); // Redirect if no slug is found
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} /> {/* Pass the post data to PostForm */}
      </Container>
    </div>
  ) : (
    <div>Loading...</div> // Optionally show a loading indicator while fetching
  );
}

export default EditPost;

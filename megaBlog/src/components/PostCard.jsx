import React from "react";
import appwriteService from "../appwriteServices/db&storage";
import { Link } from "react-router-dom";

function PostCard({ $id, title, image }) {
  const fallbackImage = "megaBlog/src/assets/4141245.jpg"; // Random fallback image

  const handleError = (e) => {
    e.target.onerror = null; // prevents infinite loop in case the fallback image is also broken
    e.target.src = fallbackImage; // Set the fallback image
  };

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getImage(image)}
            alt={`Post image for ${title}`} // More descriptive alt text for accessibility
            className="rounded-xl"
            onError={handleError} // Fallback image handler
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

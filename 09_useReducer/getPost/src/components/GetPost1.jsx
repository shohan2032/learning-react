import React, { useState, useEffect } from "react";

function GetPost1() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch(() => setError("Error fetching data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <h1 className="text-3xl text-blue-500 font-semibold">Loading...</h1>
      ) : error ? (
        <h1 className="text-2xl text-red-500 font-semibold">{error}</h1>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-gray-600">{post.body}</p>
        </div>
      )}
    </div>
  );
}

export default GetPost1;

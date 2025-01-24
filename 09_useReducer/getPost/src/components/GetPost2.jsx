import React from "react";
import { useReducer, useEffect } from "react";

const initialState = {
  loading: true,
  error: "",
  post: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        post: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        post: {},
        error: "Error fetching data",
      };
    default:
      return state;
  }
};

function GetPost2() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch(() => dispatch({ type: "FETCH_ERROR" }));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {state.loading ? (
        <h1 className="text-3xl text-blue-500 font-semibold">Loading...</h1>
      ) : state.error ? (
        <h1 className="text-2xl text-red-500 font-semibold">{state.error}</h1>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{state.post.title}</h1>
          <p className="text-gray-600">{state.post.body}</p>
        </div>
      )}
    </div>
  );
}

export default GetPost2;

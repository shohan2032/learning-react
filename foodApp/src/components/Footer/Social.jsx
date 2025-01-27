import React from "react";
import { Link } from "react-router-dom";

const Social = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Social</h2>
      <ul className="flex items-center space-x-4">
        <li>
          <Link
            to={{ pathname: "https://facebook.com" }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987H7.898v-2.89h2.54V9.797c0-2.508 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.261c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "https://twitter.com" }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.46 6.011c-.77.343-1.597.574-2.462.677a4.301 4.301 0 001.885-2.37 8.59 8.59 0 01-2.73 1.043 4.28 4.28 0 00-7.29 3.9 12.14 12.14 0 01-8.81-4.47 4.282 4.282 0 001.32 5.71A4.27 4.27 0 012.8 9.71v.054a4.283 4.283 0 003.43 4.2 4.27 4.27 0 01-1.926.073 4.283 4.283 0 004.001 2.97 8.587 8.587 0 01-5.317 1.833c-.345 0-.685-.02-1.02-.059a12.15 12.15 0 006.57 1.926c7.88 0 12.197-6.526 12.197-12.197 0-.186-.004-.372-.013-.557a8.697 8.697 0 002.14-2.21z" />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "https://linkedin.com" }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.269c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.269h-3v-5.396c0-1.287-.025-2.945-1.797-2.945-1.797 0-2.073 1.402-2.073 2.85v5.491h-3v-10h2.873v1.367h.041c.4-.757 1.377-1.555 2.835-1.555 3.032 0 3.593 1.995 3.593 4.591v5.597z" />
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Social;

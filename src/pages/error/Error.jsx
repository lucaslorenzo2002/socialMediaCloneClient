import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <img src="/twitter-logo.png" alt="Twitter Logo" width={"40px"} className="mx-auto mb-4"/>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="mb-6">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;

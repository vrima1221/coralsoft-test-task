import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Oops! Something Went Wrong
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          An unexpected error has occurred. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

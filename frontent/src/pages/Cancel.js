import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-700">Payment Failed ❌</h1>
      <p className="text-lg text-gray-700 mt-2">Your payment was not completed.</p>
      <button
        onClick={() => navigate("/cart")}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default Cancel;

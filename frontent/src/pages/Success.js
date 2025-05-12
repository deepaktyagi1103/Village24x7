import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-700 mt-2">Thank you for your purchase.</p>
      <button
        onClick={() => navigate("/order")}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        See Order
      </button>
    </div>
  );
};

export default Success;

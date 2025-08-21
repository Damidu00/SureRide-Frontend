import React from "react";
import Navbar from "../../components/Navbar";
import PopularRides from "../../components/PopularRides";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Car Rental</h1>
          <p className="mb-6 text-gray-700">Find your perfect ride and book instantly. Enjoy the best cars at the best prices!</p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="bg-[#1877f2] text-white px-6 py-2 rounded hover:bg-blue-600 transition">Login</Link>
            <Link to="/signup" className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">Sign Up</Link>
          </div>
        </div>
        <PopularRides />
      </div>
    </div>
  );
}

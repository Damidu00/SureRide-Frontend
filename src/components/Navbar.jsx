import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-between fixed w-full top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">CarRental</span>
      </div>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
        <Link to="/rides" className="text-gray-700 hover:text-blue-600 font-medium transition">Popular Rides</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">Login</Link>
        <Link to="/signup" className="text-gray-700 hover:text-blue-600 font-medium transition">Sign Up</Link>
      </div>
    </nav>
  );
}

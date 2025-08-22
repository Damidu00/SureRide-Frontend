import React from "react";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-transparent backdrop-blur-md py-4 px-8 flex items-center justify-between fixed w-full top-0 left-0 z-50">
      {/* Logo - Left Side */}
      <div className="flex items-center gap-2">
        <img 
          src="/src/assets/logo.png" 
          alt="CarRental Logo" 
          className="h-10 w-auto drop-shadow-sm"
        />
      </div>
      
      {/* Center Navigation */}
      <div className="flex items-center gap-8">
        <a 
          href="/" 
          className="text-white hover:text-blue-400 font-medium transition-colors duration-200 drop-shadow-lg"
        >
          Home
        </a>
        <a 
          href="/post-ad" 
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Post your ad
        </a>
        <a 
          href="/profile" 
          className="text-white hover:text-blue-400 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
        >
          <User size={20} className="drop-shadow-lg" />
        </a>
      </div>
      
      {/* Logout - Right Side */}
      <div className="flex items-center">
        <button className="text-white hover:text-red-400 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full">
          <LogOut size={20} className="drop-shadow-lg" />
        </button>
      </div>
    </nav>
  );
}
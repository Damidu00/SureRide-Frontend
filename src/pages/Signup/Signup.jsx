import axios from 'axios';
import React from 'react';
import { useState } from "react";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/users/",{
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      console.log(res)

      if (res.status == 200) {
        toast.success('User Created')
        navigate("/login");
      }
    } catch (err) {
      if(err.status == 409){
        toast.error("User Already Exist")
      }
      setError("Server error");
      
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1877f2]">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#1877f2] text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-[#1877f2] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

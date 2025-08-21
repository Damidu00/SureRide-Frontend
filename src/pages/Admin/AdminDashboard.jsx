import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './users'
import Cars from './Cars'
import BookingList from './Booking'


function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/admin/users" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Users
          </Link>
          <Link to="/admin/cars" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Cars
          </Link>
          <Link to="/admin/bookings" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Bookings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="cars" element={<Cars />} />
          <Route path="bookings" element={<BookingList/>} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard

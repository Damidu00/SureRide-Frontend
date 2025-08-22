import React, { useEffect, useState } from "react"
import axios from "axios"

function BookingList() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/")
        setBookings(res.data.bookings) // ✅ your API returns { bookings: [...] }
      } catch (err) {
        setError("Failed to load bookings")
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Car</th>
              <th className="px-6 py-3 text-left">Reg. Number</th>
              <th className="px-6 py-3 text-left">Start Date</th>
              <th className="px-6 py-3 text-left">End Date</th>
              <th className="px-6 py-3 text-left">Total Price ($)</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">
                    {booking.user.firstName} {booking.user.lastName}
                  </td>
                  <td className="px-6 py-3">{booking.user.email}</td>
                  <td className="px-6 py-3">
                    {booking.car.brand} {booking.car.model}
                  </td>
                  <td className="px-6 py-3">{booking.car.registrationNumber}</td>
                  <td className="px-6 py-3">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">${booking.totalPrice}</td>
                  <td
                    className={`px-6 py-3 font-medium ${
                      booking.status === "pending"
                        ? "text-yellow-600"
                        : booking.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingList

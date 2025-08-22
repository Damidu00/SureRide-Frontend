import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { FaTrash } from "react-icons/fa"

function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get("http://localhost:5000/api/cars", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCars(res.data.cars) // ✅ matches your API structure
    } catch (err) {
      setError("Failed to load cars")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token")
    if (!window.confirm("Are you sure you want to delete this car?")) return

    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Car deleted successfully")
      setCars(cars.filter((car) => car._id !== id)) // update UI
    } catch (err) {
      toast.error("Failed to delete car")
    }
  }

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
      <h2 className="text-2xl font-semibold mb-4">Registered Cars</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Car ID</th>
              <th className="px-6 py-3 text-left">Brand</th>
              <th className="px-6 py-3 text-left">Model</th>
              <th className="px-6 py-3 text-left">Year</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Color</th>
              <th className="px-6 py-3 text-left">Mileage</th>
              <th className="px-6 py-3 text-left">Price/Day ($)</th>
              <th className="px-6 py-3 text-left">Availability</th>
              <th className="px-6 py-3 text-left">Reg. Number</th>
              <th className="px-6 py-3 text-left">Features</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <tr
                  key={car._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{car.carId}</td>
                  <td className="px-6 py-3">{car.brand}</td>
                  <td className="px-6 py-3">{car.model}</td>
                  <td className="px-6 py-3">{car.year}</td>
                  <td className="px-6 py-3">{car.type}</td>
                  <td className="px-6 py-3">{car.color}</td>
                  <td className="px-6 py-3">{car.mileage} km</td>
                  <td className="px-6 py-3">${car.pricePerDay}</td>
                  <td
                    className={`px-6 py-3 font-medium ${
                      car.availability ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {car.availability ? "Available" : "Not Available"}
                  </td>
                  <td className="px-6 py-3">{car.registrationNumber}</td>
                  <td className="px-6 py-3">
                    {car.features && car.features.join(", ")}
                  </td>
                  <td className="px-6 py-3">
                    {car.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${car.image}`}
                        alt={car.model}
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="14"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No cars found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cars

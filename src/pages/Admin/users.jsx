import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please log as admin");
    }
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/allusers", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        console.log(res)
        setUsers(res.data.users)  
      } catch (err) {
        setError("Failed to load users")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
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
      <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">First Name</th>
              <th className="px-6 py-3 text-left">Last Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{user.firstName}</td>
                  <td className="px-6 py-3">{user.lastName}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3 capitalize">{user.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users

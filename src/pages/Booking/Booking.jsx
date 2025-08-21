import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Booking(){
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const carId = params.get('carId')

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(Boolean(carId))
  const [error, setError] = useState(null)

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

  useEffect(()=>{
    let mounted = true
    if(!carId) return setLoading(false)
    async function load(){
      try{
        setLoading(true)
        const res = await fetch(`${API_BASE}/api/cars/${carId}`)
        if(!res.ok) throw new Error('Failed to load car')
        const data = await res.json()
        if(mounted) setCar(data.car)
      }catch(err){ if(mounted) setError(err.message) }
      finally{ if(mounted) setLoading(false) }
    }
    load()
    return ()=>{ mounted = false }
  },[carId, API_BASE])

  async function handlePay(e){
    e.preventDefault()
    try{
      // Dynamically import SweetAlert2 from CDN to avoid adding dependency
      const SwalModule = await import('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.esm.js')
      const Swal = SwalModule.default || SwalModule
      await Swal.fire({
        icon: 'success',
        title: 'Payment successfull',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      })
      // After payment, navigate to home or bookings
      navigate('/')
    }catch(err){
      console.error('Payment alert failed', err)
      // Fallback: try global Swal (if included via script) or basic alert
      if (typeof window !== 'undefined' && window.Swal) {
        window.Swal.fire({ icon: 'success', title: 'Payment successfull' })
      } else {
        alert('Payment successfull')
      }
      navigate('/')
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <button onClick={()=>navigate(-1)} className="mb-6 text-sm text-blue-600 hover:underline">&larr; Back</button>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Complete payment</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            {car ? (
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <img src={`${API_BASE}/uploads/${car.image}`} alt={`${car.brand} ${car.model}`} className="w-24 h-16 object-cover rounded" />
                  <div>
                    <div className="font-semibold">{car.brand} {car.model}</div>
                    <div className="text-sm text-gray-600">{car.year} • {car.color}</div>
                    <div className="text-blue-600 font-bold mt-1">${car.pricePerDay}/day</div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No car selected. You can still make a payment for demo purposes.</p>
            )}

            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Name on card</label>
                <input required className="w-full border rounded px-3 py-2" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Card number</label>
                <input required className="w-full border rounded px-3 py-2" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input required className="border rounded px-3 py-2" placeholder="MM/YY" />
                <input required className="border rounded px-3 py-2" placeholder="CVC" />
                <input className="border rounded px-3 py-2" placeholder="Postal code" />
              </div>

              <div className="pt-4">
                <button type="submit" className="px-5 py-3 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700">Pay</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

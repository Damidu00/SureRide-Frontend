import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function CarDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        setLoading(true)
        const res = await fetch(`${API_BASE}/api/cars/${id}`)
        if(!res.ok) throw new Error('Car not found')
        const data = await res.json()
        if(mounted) setCar(data.car)
      }catch(err){
        if(mounted) setError(err.message)
      }finally{
        if(mounted) setLoading(false)
      }
    }
    load()
    return ()=>{ mounted = false }
  },[id, API_BASE])

  // Helper to normalize features to array of strings
  function normalizeFeatures(features){
    if(!features) return []
    if(Array.isArray(features)){
      if(features.length === 1 && typeof features[0] === 'string' && features[0].includes(',')){
        return features[0].split(',').map(s=>s.trim())
      }
      return features
    }
    if(typeof features === 'string') return features.split(',').map(s=>s.trim())
    return []
  }

  // Loading skeleton
  if(loading) return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="animate-pulse space-y-6">
        <div className="h-64 bg-gray-200 rounded-lg" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )

  if(error) return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center text-red-600">
        <p className="font-semibold">Unable to load car details</p>
        <p className="mt-2">{error}</p>
        <button onClick={()=>navigate(-1)} className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded">Go back</button>
      </div>
    </div>
  )

  if(!car) return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-center">No details available</div>
  )

  const features = normalizeFeatures(car.features)
  const imageUrl = car.image ? `${API_BASE}/uploads/${car.image}` : `https://via.placeholder.com/1200x800?text=${encodeURIComponent(car.brand+'+'+car.model)}`

  function handleBook(){
    navigate(`/booking?carId=${car._id}`)
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <button onClick={()=>navigate(-1)} className="mb-6 text-sm text-blue-600 hover:underline">&larr; Back</button>

      <div className="md:flex md:items-stretch md:gap-6">
        {/* Left: image card (has shadow) */}
        <div className="md:w-1/2 flex-shrink-0">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img src={imageUrl} alt={`${car.brand} ${car.model}`} className="w-full h-96 md:h-full object-cover" />
          </div>
        </div>

        {/* Right: details column (no shadow) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between bg-white rounded-xl">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
                <p className="text-gray-600">{car.type} • {car.year} • {car.color}</p>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-2xl font-bold text-blue-600">${Number(car.pricePerDay).toLocaleString()}/day</div>
                <div className={`mt-2 text-sm font-medium ${car.availability ? 'text-green-600' : 'text-red-600'}`}>{car.availability ? 'Available' : 'Unavailable'}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>Registration: <span className="font-medium">{car.registrationNumber}</span></div>
              <div>Mileage: <span className="font-medium">{car.mileage?.toLocaleString() || '—'}</span></div>
              <div>ID: <span className="font-medium">{car.carId || car._id}</span></div>
              <div>Color: <span className="font-medium">{car.color}</span></div>
            </div>

            {features.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {features.map((f,i)=>(
                    <span key={i} className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{f}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button onClick={handleBook} disabled={!car.availability} className={`px-6 py-3 rounded-md text-white font-semibold ${car.availability ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}>
              {car.availability ? 'Book now' : 'Not available'}
            </button>
            <button onClick={()=>{navigator.clipboard?.writeText(imageUrl)}} className="px-4 py-2 rounded-md border">Share Image</button>
          </div>
        </div>
      </div>
    </div>
  )
}

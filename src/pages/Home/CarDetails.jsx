
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function CarDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // rental period state
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedAvailable, setSelectedAvailable] = useState(true)

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        setLoading(true)
        const url = `${API_BASE}/api/cars/${id}`
        console.debug('[CarDetails] fetching', url)
        const res = await fetch(url)
        const text = await res.text()
        let data
        try{
          data = JSON.parse(text)
        }catch(err){
          // not JSON
          throw new Error(`Invalid JSON response: ${text}`)
        }

        if(!res.ok){
          // include server message when available
          const msg = data && (data.message || data.error || JSON.stringify(data))
          throw new Error(`Server responded ${res.status}: ${msg}`)
        }

        // backend should return { car: {...} }
        if(data && data.car){
          if(mounted) setCar(data.car)
        } else if(data && Array.isArray(data.cars)){
          // fallback: find car in returned list
          const found = data.cars.find(c => String(c._id) === String(id) || String(c.carId) === String(id))
          if(found){
            if(mounted) setCar(found)
          } else {
            throw new Error('Car not found in server response')
          }
        } else {
          throw new Error('Unexpected server response: ' + JSON.stringify(data))
        }
      }catch(err){
        console.error('[CarDetails] load error', err)
        if(mounted) setError(err.message)
      }finally{
        if(mounted) setLoading(false)
      }
    }
    load()
    return ()=>{ mounted = false }
  },[id, API_BASE])

  // initialize dates when car loads
  useEffect(()=>{
    if(!car) return
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const toIso = d => d.toISOString().slice(0,10)
    setStartDate(toIso(today))
    setEndDate(toIso(tomorrow))
  },[car])

  // check availability for selected dates
  useEffect(()=>{
    if(!startDate || !endDate || !car) return
    let mounted = true
    async function check(){
      try{
        const res = await fetch(`${API_BASE}/api/bookings/available?startDate=${startDate}&endDate=${endDate}`)
        if(!res.ok) throw new Error('availability check failed')
        const data = await res.json()
        if(!mounted) return
        if(data && Array.isArray(data.available)){
          const found = data.available.some(c => String(c._id) === String(car._id))
          setSelectedAvailable(found && car.availability)
        }
      }catch(err){
        if(mounted) setSelectedAvailable(false)
      }
    }
    check()
    return ()=>{ mounted = false }
  },[startDate, endDate, car, API_BASE])

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

  // calculate total amount (inclusive days)
  function daysBetweenInclusive(s,e){
    const msPerDay = 24*60*60*1000
    const sd = new Date(s)
    const ed = new Date(e)
    const diff = Math.round((ed - sd) / msPerDay)
    return diff >= 0 ? diff + 1 : 0
  }

  const daysCount = (startDate && endDate) ? daysBetweenInclusive(startDate, endDate) : 0
  const totalPrice = daysCount * Number(car.pricePerDay)

  // a small rating fallback to enrich UI
  const rating = car.rating || 4.6

  function handleBook(){
    // pass carId, startDate, endDate and calculated totalPrice
    navigate(`/booking?carId=${car._id}&startDate=${startDate}&endDate=${endDate}&price=${totalPrice}`)
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8">
      <button onClick={()=>navigate(-1)} className="mb-6 text-sm text-blue-600 hover:underline flex items-center gap-2">← Back</button>

      <div className="md:flex md:items-start md:gap-8">
    {/* Left: image */}
    <div className="md:w-1/2 flex-shrink-0 rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50">
          <div className="relative">
      <img src={imageUrl} alt={`${car.brand} ${car.model}`} className="w-full h-96 md:h-[520px] object-cover transition-transform duration-400 hover:scale-105" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.784.57-1.838-.197-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.06 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z"/></svg>
              <span className="text-sm font-medium">{rating.toFixed(1)} ★</span>
            </div>
          </div>
        </div>

        {/* Right: details */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between bg-white rounded-xl shadow-lg -mt-6 md:mt-0">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-extrabold mb-1">{car.brand} {car.model}</h1>
                <p className="text-gray-600">{car.type} • {car.year} • {car.color}</p>
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                  <div className="inline-flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">ID: <span className="font-medium text-gray-700">{car.carId || car._id}</span></div>
                  <div className="inline-flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">Reg: <span className="font-medium text-gray-700">{car.registrationNumber}</span></div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-2xl font-bold text-blue-600">Rs: {Number(car.pricePerDay).toLocaleString()}/day</div>
                <div className={`mt-2 text-sm font-medium ${car.availability ? 'text-green-600' : 'text-red-600'}`}>{car.availability ? 'Available' : 'Unavailable'}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>Mileage: <span className="font-medium">{car.mileage?.toLocaleString() || '—'}</span></div>
              <div>Color: <span className="font-medium">{car.color}</span></div>
              <div>Seats: <span className="font-medium">{car.seats || '—'}</span></div>
              <div>Transmission: <span className="font-medium">{car.transmission || '—'}</span></div>
            </div>

            {features.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {features.map((f,i)=>(
                    <span key={i} className="inline-block bg-gradient-to-r from-gray-100 to-white text-gray-800 px-3 py-1 rounded-full text-sm shadow-sm">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Date range inputs */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start date</label>
                <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="border rounded px-3 py-2 w-full shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End date</label>
                <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} className="border rounded px-3 py-2 w-full shadow-sm" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-600">Days</div>
              <div className="text-lg font-semibold col-span-2">{daysCount}</div>
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-lg font-bold text-gray-800 col-span-2">Rs: {totalPrice.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Date availability</div>
              <div className="col-span-2">
                {selectedAvailable ? (
                  <span className="text-green-600 font-medium">Available for selected dates</span>
                ) : (
                  <span className="text-red-600 font-medium">Not available for selected dates</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button 
              onClick={handleBook} 
              disabled={!(car.availability && selectedAvailable && daysCount > 0)} 
              className={`px-6 py-3 rounded-md text-white font-semibold transition ${car.availability && selectedAvailable && daysCount > 0 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              {car.availability && selectedAvailable ? 'Book now' : 'Not available'}
            </button>
            <button onClick={()=>{navigator.clipboard?.writeText(imageUrl)}} className="px-4 py-2 rounded-md border hover:bg-gray-50">Share image</button>
            <a href={`mailto:?subject=Check out this car&body=${encodeURIComponent(`${car.brand} ${car.model} — ${imageUrl}`)}`} className="px-4 py-2 rounded-md border hover:bg-gray-50">Share email</a>
          </div>
        </div>
      </div>
    </div>
  )
}


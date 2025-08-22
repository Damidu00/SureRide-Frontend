// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// export default function Booking(){
//   const location = useLocation()
//   const navigate = useNavigate()
//   const params = new URLSearchParams(location.search)
//   const carId = params.get('carId')

//   const [car, setCar] = useState(null)
//   const [loading, setLoading] = useState(Boolean(carId))
//   const [error, setError] = useState(null)
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [totalPrice, setTotalPrice] = useState(0)

//   const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

//   useEffect(()=>{
//     let mounted = true
//     if(!carId) return setLoading(false)
//     async function load(){
//       try{
//         setLoading(true)
//         const res = await fetch(`${API_BASE}/api/cars/${carId}`)
//         if(!res.ok) throw new Error('Failed to load car')
//         const data = await res.json()
//         if(mounted) setCar(data.car)
//       }catch(err){ if(mounted) setError(err.message) }
//       finally{ if(mounted) setLoading(false) }
//     }
//     load()
//     return ()=>{ mounted = false }
//   },[carId, API_BASE])

//   // initialize dates when car loads
//   useEffect(()=>{
//     if(!car) return
//     const today = new Date()
//     const tomorrow = new Date(today)
//     tomorrow.setDate(today.getDate() + 1)
//     const toIso = d => d.toISOString().slice(0,10)
//     setStartDate(toIso(today))
//     setEndDate(toIso(tomorrow))
//     setTotalPrice(car.pricePerDay || 0)
//   },[car])

//   // recalc totalPrice when dates change
//   useEffect(()=>{
//     if(!car || !startDate || !endDate) return
//     try{
//       const s = new Date(startDate)
//       const e = new Date(endDate)
//       const diff = Math.ceil((e - s) / (1000*60*60*24))
//       const days = diff > 0 ? diff : 1
//       setTotalPrice((car.pricePerDay || 0) * days)
//     }catch(err){ /* ignore invalid date */ }
//   },[startDate, endDate, car])

//   async function handlePay(e){
//     e.preventDefault()
//     // first ensure user is logged in
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
//     if(!token){
//       // prompt to login
//       if (typeof window !== 'undefined' && window.Swal) {
//         window.Swal.fire({ icon: 'warning', title: 'Please login to complete booking' })
//       } else {
//         alert('Please login to complete booking')
//       }
//       navigate('/login')
//       return
//     }

//     try{
//       // create booking on server
//       const payload = {
//         car: car ? car._id : carId,
//         startDate,
//         endDate,
//         totalPrice
//       }

//       const res = await fetch(`${API_BASE}/api/bookings`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//       })

//       const data = await res.json()

//       if(!res.ok && !data.booking){
//         const msg = data.message || 'Booking failed'
//         throw new Error(msg)
//       }

//       // show success alert
//       try{
//         const SwalModule = await import('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.esm.js')
//         const Swal = SwalModule.default || SwalModule
//         await Swal.fire({ icon: 'success', title: 'Payment successfull', text: data.message || 'Booking created' })
//       }catch(err){
//         if (typeof window !== 'undefined' && window.Swal) {
//           window.Swal.fire({ icon: 'success', title: 'Payment successfull' })
//         } else {
//           alert('Payment successfull')
//         }
//       }

//       // after successful booking navigate to bookings list or home
//       navigate('/')
//     }catch(err){
//       console.error('Booking creation failed', err)
//       setError(err.message || 'Booking failed')
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto py-12 px-4">
//       <button onClick={()=>navigate(-1)} className="mb-6 text-sm text-blue-600 hover:underline">&larr; Back</button>

//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-xl font-bold mb-4">Complete payment</h2>

//         {loading ? (
//           <p className="text-gray-600">Loading...</p>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
//         ) : (
//           <>
//             {car ? (
//               <div className="mb-6">
//                 <div className="flex items-center gap-4">
//                   <img src={`${API_BASE}/uploads/${car.image}`} alt={`${car.brand} ${car.model}`} className="w-24 h-16 object-cover rounded" />
//                   <div>
//                     <div className="font-semibold">{car.brand} {car.model}</div>
//                     <div className="text-sm text-gray-600">{car.year} • {car.color}</div>
//                     <div className="text-blue-600 font-bold mt-1">${car.pricePerDay}/day</div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-600">No car selected. You can still make a payment for demo purposes.</p>
//             )}

//             <form onSubmit={handlePay} className="space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-700 mb-1">Name on card</label>
//                 <input required className="w-full border rounded px-3 py-2" placeholder="Full name" />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-700 mb-1">Card number</label>
//                 <input required className="w-full border rounded px-3 py-2" placeholder="4242 4242 4242 4242" />
//               </div>
//               <div className="grid grid-cols-3 gap-4">
//                 <input required className="border rounded px-3 py-2" placeholder="MM/YY" />
//                 <input required className="border rounded px-3 py-2" placeholder="CVC" />
//                 <input className="border rounded px-3 py-2" placeholder="Postal code" />
//               </div>

//               <div className="pt-4">
//                 <button type="submit" className="px-5 py-3 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700">Pay</button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }




import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Booking(){
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const carId = params.get('carId')
  const daysParam = params.get('days')     // retained for backward compat
  const priceParam = params.get('price')   // price passed from CarDetails (calculated)
  const startParam = params.get('startDate')
  const endParam = params.get('endDate')

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(Boolean(carId))
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)

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

  // initialize dates when car loads or when start/end passed in query
  useEffect(()=>{
    if(!car) return
    const toIso = d => d.toISOString().slice(0,10)
    if(startParam && endParam){
      setStartDate(startParam)
      setEndDate(endParam)
    } else {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      setStartDate(toIso(today))
      setEndDate(toIso(tomorrow))
    }

    // use price passed from CarDetails if available, else compute from car.pricePerDay and the chosen dates
    if(priceParam){
      setTotalPrice(Number(priceParam))
    } else if(car){
      const s = startParam ? new Date(startParam) : new Date()
      const e = endParam ? new Date(endParam) : new Date(Date.now() + 24*60*60*1000)
      const msPerDay = 24*60*60*1000
      const diff = Math.round((e - s) / msPerDay)
      const days = diff >= 0 ? diff + 1 : 0
      setTotalPrice((car.pricePerDay || 0) * days)
    }
  },[car, priceParam, startParam, endParam])

  // recalc totalPrice only if user changes dates manually and price wasn't passed from car details
  useEffect(()=>{
    if(!car || !startDate || !endDate) return
    if(priceParam) return
    try{
      const s = new Date(startDate)
      const e = new Date(endDate)
      const msPerDay = 24*60*60*1000
      const diff = Math.round((e - s) / msPerDay)
      const days = diff >= 0 ? diff + 1 : 0
      setTotalPrice((car.pricePerDay || 0) * days)
    }catch(err){ /* ignore invalid date */ }
  },[startDate, endDate, car, priceParam])

  async function handlePay(e){
    e.preventDefault()
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if(!token){
      if (typeof window !== 'undefined' && window.Swal) {
        window.Swal.fire({ icon: 'warning', title: 'Please login to complete booking' })
      } else {
        alert('Please login to complete booking')
      }
      navigate('/login')
      return
    }

    try{
      const payload = {
        car: car ? car._id : carId,
        startDate,
        endDate,
        totalPrice
      }

      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if(!res.ok && !data.booking){
        const msg = data.message || 'Booking failed'
        throw new Error(msg)
      }

      try{
        const SwalModule = await import('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.esm.js')
        const Swal = SwalModule.default || SwalModule
        await Swal.fire({ icon: 'success', title: 'Payment successful', text: data.message || 'Booking created' })
      }catch(err){
        if (typeof window !== 'undefined' && window.Swal) {
          window.Swal.fire({ icon: 'success', title: 'Payment successful' })
        } else {
          alert('Payment successful')
        }
      }

      navigate('/')
    }catch(err){
      console.error('Booking creation failed', err)
      setError(err.message || 'Booking failed')
    }
  }

  return (
  <div className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
      <button onClick={()=>navigate(-1)} className="mb-6 text-sm text-blue-600 hover:underline flex items-center gap-2">← Back</button>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-extrabold mb-4">Complete payment</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {car ? (
                <div className="mb-6 flex items-center gap-4">
                  <img src={`${API_BASE}/uploads/${car.image}`} alt={`${car.brand} ${car.model}`} className="w-28 h-20 object-cover rounded-lg shadow" />
                  <div>
                    <div className="font-semibold text-lg">{car.brand} {car.model}</div>
                    <div className="text-sm text-gray-600">{car.year} • {car.color}</div>
                    <div className="text-indigo-600 font-bold mt-1">Rs: {car.pricePerDay}/day</div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No car selected. You can still make a payment for demo purposes.</p>
              )}

              {/* Date inputs for rental period */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start date</label>
                  <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="w-full border rounded px-3 py-2 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End date</label>
                  <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} className="w-full border rounded px-3 py-2 shadow-sm" />
                </div>
              </div>

              <div className="mb-4 text-lg font-semibold text-gray-800">Total to Pay: <span className="text-indigo-600">Rs: {totalPrice.toLocaleString()}</span></div>

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
                  <button type="submit" className="w-full md:w-auto px-5 py-3 rounded-md text-white font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">Pay</button>
                </div>
              </form>
            </div>

            {/* Right column: summary & tips */}
            <aside className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Booking summary</h3>
              <div className="text-sm text-gray-600 mb-2">Period</div>
              <div className="mb-4">
                <div className="font-medium">{startDate || '—'} → {endDate || '—'}</div>
                <div className="text-sm text-gray-500">Days: {(() => { try{ const s=new Date(startDate); const e=new Date(endDate); const ms=24*60*60*1000; const diff=Math.round((e-s)/ms); return diff>=0?diff+1:0 }catch{ return 0 } })()}</div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-700"><span>Daily rate</span><span>Rs: {car?.pricePerDay || 0}</span></div>
                <div className="flex justify-between font-semibold text-gray-800"><span>Total</span><span>Rs: {totalPrice.toLocaleString()}</span></div>
              </div>

              <div className="text-xs text-gray-500">Payments in this demo are simulated. You will receive a booking confirmation after completion.</div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

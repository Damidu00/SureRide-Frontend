import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PopularRides() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    let mounted = true;

    async function loadCars() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/cars`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        if (mounted) setCars(Array.isArray(data.cars) ? data.cars : []);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch cars");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadCars();
    return () => { mounted = false; };
  }, [API_BASE]);

  function renderFeatures(features) {
    if (!features) return null;
    if (Array.isArray(features)) {
      if (features.length === 1 && typeof features[0] === "string" && features[0].includes(",")) {
        return features[0].split(",").map((f) => f.trim());
      }
      return features;
    }
    if (typeof features === "string") return features.split(",").map((f) => f.trim());
    return null;
  }

  const navigate = useNavigate()

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center sm:text-4xl md:text-5xl -mt-18">
        Book Your Ride Here
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading popular rides…</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading rides: {error}</p>
      ) : cars.length === 0 ? (
        <p className="text-center text-gray-500">No rides found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cars.map((car) => {
            const features = renderFeatures(car.features) || [];
            const imageUrl = car.image
              ? `${API_BASE}/uploads/${car.image}`
              : `https://via.placeholder.com/400x240?text=${encodeURIComponent(car.brand + ' ' + car.model)}`;

            return (
              <Link
                key={car._id}
                to={`/cars/${car._id}`}
                onClick={(e)=>{ e.preventDefault(); navigate(`/cars/${car._id}`) }}
                className="relative w-full h-68 sm:h-80 lg:h-96 rounded-[8px] shadow-lg overflow-hidden group cursor-pointer"
              >
                {/* Car Image */}
                <img
                  src={imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Info Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-white bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{car.brand} {car.model}</h3>
                  <p className="text-gray-600 text-sm mb-2">{car.year} • {car.color}</p>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md mb-2 inline-block">
                    RS: {car.pricePerDay}/day
                  </span>
                  {features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {features.slice(0, 4).map((f, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded-2xl"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

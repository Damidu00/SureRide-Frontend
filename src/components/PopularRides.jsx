import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PopularRides() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Allow overriding the API base URL via Vite env variable VITE_API_BASE_URL
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    let mounted = true;

    async function loadCars() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/cars`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        if (mounted) {
          setCars(Array.isArray(data.cars) ? data.cars : []);
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch cars");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadCars();

    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  function renderFeatures(features) {
    if (!features) return null;
    // API may send an array where the first item is a comma-separated string
    if (Array.isArray(features)) {
      if (features.length === 1 && typeof features[0] === "string" && features[0].includes(",")) {
        return features[0].split(",").map((f) => f.trim());
      }
      return features;
    }
    if (typeof features === "string") return features.split(",").map((f) => f.trim());
    return null;
  }

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-black mb-8 text-center text-6xl -mt-18">Book Your Ride Here</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading popular rides…</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading rides: {error}</p>
      ) : cars.length === 0 ? (
        <p className="text-center text-gray-600">No rides found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {cars.map((car) => {
            const features = renderFeatures(car.features) || [];
            const imageUrl = car.image ? `${API_BASE}/uploads/${car.image}` : `https://via.placeholder.com/400x240?text=${encodeURIComponent(car.brand + ' ' + car.model)}`;
            return (
              <Link key={car._id} to={`/cars/${car._id}`} className="block bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
                <img src={imageUrl} alt={`${car.brand} ${car.model}`} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{car.brand} {car.model}</h3>
                  <p className="text-blue-600 font-bold">${car.pricePerDay}/day</p>
                  <p className="text-sm text-gray-500 mt-2">{car.year} • {car.color}</p>
                  {features.length > 0 && (
                    <div className="mt-3 text-sm text-gray-600">
                      {features.slice(0, 3).map((f, i) => (
                        <span key={i} className="inline-block mr-2">{f}</span>
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

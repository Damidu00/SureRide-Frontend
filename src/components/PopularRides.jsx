import React from "react";

const rides = [
  {
    name: "Toyota Prius",
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
    price: "$40/day",
  },
  {
    name: "Honda Civic",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    price: "$35/day",
  },
  {
    name: "BMW 3 Series",
    image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80",
    price: "$80/day",
  },
  {
    name: "Tesla Model 3",
    image: "https://images.unsplash.com/photo-1511391403515-5c1b5a4a3c8a?auto=format&fit=crop&w=400&q=80",
    price: "$100/day",
  },
];

export default function PopularRides() {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Popular Rides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {rides.map((ride, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <img src={ride.image} alt={ride.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{ride.name}</h3>
              <p className="text-blue-600 font-bold">{ride.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

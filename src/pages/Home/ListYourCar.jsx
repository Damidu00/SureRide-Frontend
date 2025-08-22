import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SecondNavBar from "../../components/SecondNavBar";


export default function AddCar() {

    const navigate = useNavigate()
  const [carData, setCarData] = useState({
    carId: "",
    brand: "",
    model: "",
    year: "",
    type: "",
    color: "",
    registrationNumber: "",
    pricePerDay: "",
    mileage: "",
    features: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (let key in carData) {
        if (key === "features") {
          formData.append(key, carData[key].split(",").map(f => f.trim()));
        } else {
          formData.append(key, carData[key]);
        }
      }
      if (image) formData.append("image", image);

      const response = await axios.post("http://localhost:5000/api/cars/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setCarData({
        carId: "",
        brand: "",
        model: "",
        year: "",
        type: "",
        color: "",
        registrationNumber: "",
        pricePerDay: "",
        mileage: "",
        features: "",
      });
      toast.success("Your Car Added Successfully")
      navigate('/')
      setImage(null);
      setPreview(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <SecondNavBar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          List Your Car Here
        </h1>
        {message && (
          <div className="mb-4 text-center text-green-600 font-medium">{message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="carId"
              placeholder="Car ID"
              value={carData.carId}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={carData.brand}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={carData.model}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={carData.year}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="type"
              placeholder="Type (SUV, Sedan, etc.)"
              value={carData.type}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={carData.color}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              value={carData.registrationNumber}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="pricePerDay"
              placeholder="Price per Day"
              value={carData.pricePerDay}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="mileage"
              placeholder="Mileage (km)"
              value={carData.mileage}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="features"
              placeholder="Features (comma separated)"
              value={carData.features}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">Car Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {preview && (
              <img
                src={preview}
                alt="Car Preview"
                className="mt-2 h-48 w-full object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? "Listing..." : "List Car"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

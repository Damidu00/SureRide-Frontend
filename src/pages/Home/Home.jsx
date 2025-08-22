import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PopularRides from "../../components/PopularRides";
import Footer from "../../components/Footer";
import bgImage from "../../assets/bg.png";

export default function Home() {
  const tagline = "Find your perfect ride and book instantly.\nEnjoy the best cars at the best prices!";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(tagline.slice(0, index + 1));
      index++;
      if (index === tagline.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div
        className="relative w-full h-[90vh] flex items-center justify-center pt-20 -mt-6"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white -mt-[200px] font-sans">
            Welcome to Car Rental
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl font-medium h-24 text-white font-mono -mt-[30px]"
            style={{ whiteSpace: "pre-line" }}
          >
            {typedText}
            <span className="border-r-2 border-white animate-blink ml-1"></span>
          </p>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8">
        <PopularRides />
      </div>

      <Footer />

      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s step-start infinite;
          }
        `}
      </style>
    </div>
  );
}

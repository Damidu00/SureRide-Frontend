import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-10 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">CarRental</h3>
          <p className="text-gray-400 text-sm mb-2">Your trusted car rental partner for every journey.</p>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500"><svg width="24" height="24" fill="currentColor"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.019 3.676 9.167 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.167 22 17.019 22 12z"/></svg></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400"><svg width="24" height="24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.59-2.47.69a4.3 4.3 0 0 0 1.88-2.37c-.83.49-1.75.85-2.72 1.05A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.13 1.64 4.16c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61-.71-.02-1.38-.22-1.97-.54v.05c0 2.09 1.49 3.83 3.47 4.23-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54c-.56 0-1.11-.03-1.65-.1A12.13 12.13 0 0 0 8.29 21c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500"><svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="3.2"/><path d="M16.8 2H7.2C4.4 2 2 4.4 2 7.2v9.6C2 19.6 4.4 22 7.2 22h9.6c2.8 0 5.2-2.4 5.2-5.2V7.2C22 4.4 19.6 2 16.8 2zm3.2 16.8c0 1.76-1.44 3.2-3.2 3.2H7.2c-1.76 0-3.2-1.44-3.2-3.2V7.2c0-1.76 1.44-3.2 3.2-3.2h9.6c1.76 0 3.2 1.44 3.2 3.2v9.6z"/></svg></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Popular Rides</a></li>
            <li><a href="#" className="hover:text-blue-400">Login</a></li>
            <li><a href="#" className="hover:text-blue-400">Sign Up</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@carrental.com" className="hover:text-blue-400">support@carrental.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-blue-400">+1 234 567 890</a></li>
            <li>Address: 123 Main St, Colombo, Sri Lanka</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">About</h4>
          <p className="text-gray-400 text-sm">CarRental is dedicated to providing the best car rental experience. Choose from a wide range of vehicles and enjoy hassle-free booking.</p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} CarRental. All rights reserved.
      </div>
    </footer>
  );
}

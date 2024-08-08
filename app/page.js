'use client'

import RedirectHome from '@/components/RedirectHome';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { Inter } from "next/font/google";
import "./globals.css";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));   
    }
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className="flex flex-col bg-grey-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">YokYok Fried Chicken</h1>
          <nav>
            <ul className="flex space-x-6">
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                <Link href="/profile">Profile</Link>
              </li>
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                <Link href="/cart">Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</Link>
              </li>
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                {isLoggedIn ? (
                  <button onClick={handleSignOut} className="text-blue-600">Sign Out</button>
                ) : (
                  <Link href="/signin">Sign In</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">ยินดีต้อนรับสู่ดินแดนไก่ทอด</h2>
          <p className="text-gray-600 mt-4">โปรดเลือกไก่ของคุณ</p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">เมนูแนะนำ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src="/menu1.jpg"
                width={300}
                height={300}
                alt="P1"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">ไก่บูด 1</h4>
                <p className="text-gray-600 mt-2">$100.00</p>
                <button 
                  onClick={() => addToCart({ name: 'ไก่บูด 1', price: 100.00 })}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src="menu2.jpg"
                width={300}
                height={300}
                alt="P2"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">ไก่บูด 2</h4>
                <p className="text-gray-600 mt-2">$200.00</p>
                <button 
                  onClick={() => addToCart({ name: 'ไก่บูด 2', price: 200.00 })}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Add more products as needed */}
          </div>
        </section>
      </main>
    </div>
  );
}

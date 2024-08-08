'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import "/app/globals.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

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
                <Link href="/cart">Cart ({cartItems.length})</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Your Cart</h2>
          <p className="text-gray-600 mt-4">Review your selected items</p>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

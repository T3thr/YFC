'use client'

import RedirectHome from '@/components/RedirectHome';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import "/app/globals.css";

export default function CartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // New state for the login popup

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));   
    }
    if (storedCartItems && JSON.parse(storedIsLoggedIn)) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems, isLoggedIn]);

  const updateQuantity = (name, quantity) => {
    if (quantity <= 0) {
      removeItem(name);
    } else {
      const updatedCartItems = cartItems.map(item =>
        item.name === name ? { ...item, quantity: quantity } : item
      );
      setCartItems(updatedCartItems);
    }
  };

  const removeItem = (name) => {
    const updatedCartItems = cartItems.filter(item => item.name !== name);
    setCartItems(updatedCartItems);
  };

  const handleSignOut = () => {
    // Store the cart items before sign out
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setRedirect(true); // Trigger redirection
  };
  
  if (redirect) {
    return <RedirectHome />; // Ensure this is only triggered once
  }

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
                {isLoggedIn ? (
                  <Link href="/cart">Cart</Link>
                ) : (
                  <Link href="/">Sign In</Link>
                )}
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

      {!isLoggedIn && (
        <main className="flex-grow container mx-auto px-6 py-8">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Please Sign In</h2>
            <p className="text-gray-600 mt-4">You need to sign in to access your cart.</p>
            <Link href="/signin">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Sign In Now
              </button>
            </Link>
          </section>
        </main>
      )}

      {isLoggedIn && (
        <main className="flex-grow container mx-auto px-6 py-8">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Your Cart</h2>
            <p className="text-gray-600 mt-4">Review and manage your items</p>
          </section>

          {cartItems.length === 0 ? (
            <section className="text-center">
              <p className="text-gray-600">Your cart is empty.</p>
              <Link href="/">
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Continue Shopping
                </button>
              </Link>
            </section>
          ) : (
            <section>
              <div className="grid grid-cols-1 gap-6">
                {cartItems.map((item, index) => (
                  <div key={item.name} className="bg-white shadow-lg rounded-lg overflow-hidden flex items-center">
                    <div className="p-4 flex-grow">
                      <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>
                      <div className="mt-4 flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400">
                          -
                        </button>
                        <span className="mx-2 text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400">
                          +
                        </button>
                        <button 
                          onClick={() => removeItem(item.name)}
                          className="ml-4 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-right">
                <p className="text-2xl font-semibold text-gray-800">Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                  Proceed to Checkout
                </button>
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
}

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectHome() {
  const router = useRouter();
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

  useEffect(() => {
    router.replace('/'); // Replace the current entry with HomePage, avoiding re-renders
  }, [router]);

  return null; // This component does not render anything
}

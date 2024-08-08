// components/RedirectHome.jsx

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectHome() {
  const router = useRouter();

  useEffect(() => {
    router.push('/'); // Adjust the path to your actual HomePage route
  }, [router]);

  return null; // This component does not render anything
}

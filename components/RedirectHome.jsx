// app/components/RedirectHome.jsx

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectHome() {
  const router = useRouter();

  useEffect(() => {
    router.push('/'); // Adjust this to your actual home page path
  }, [router]);

  return null; // This component does not render anything
}

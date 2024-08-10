'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectHome() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/'); // Replace the current entry with HomePage, avoiding re-renders
  }, [router]);

  return null; // This component does not render anything
}

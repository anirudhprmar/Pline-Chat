'use client';

import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router';

export default function ClientOnlyRouter({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div>Loading...</div>; // Or your loading component
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}
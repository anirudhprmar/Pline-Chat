'use client';

import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router';

export default function ClientOnlyRouter({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return  <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-zinc-900 text-gray-300 p-4 mb-6 border-b border-zinc-800">
      <div className="container mx-auto flex gap-6">
        <Link 
          href="/" 
          className={`hover:text-gray-100 transition-colors ${
            pathname === '/' ? 'text-white border-b-2 border-blue-500' : ''
          }`}
        >
          Home
        </Link>
        <Link 
          href="/customer-onboarding" 
          className={`hover:text-gray-100 transition-colors ${
            pathname === '/customer-onboarding' ? 'text-white border-b-2 border-blue-500' : ''
          }`}
        >
          Customer Onboarding
        </Link>
        <Link 
          href="/video-scripting" 
          className={`hover:text-gray-100 transition-colors ${
            pathname === '/video-scripting' ? 'text-white border-b-2 border-blue-500' : ''
          }`}
        >
          Video Scripting
        </Link>
      </div>
    </nav>
  );
} 
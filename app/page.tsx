"use client";

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-88px)] bg-black text-gray-200">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">AI Agent Casebook</h1>
        <p className="text-xl text-gray-300">
          Choose your assistant from the navigation menu above:
        </p>
        <div className="grid grid-cols-1 gap-6 mt-8 text-left">
          <Link 
            href="/customer-onboarding"
            className="group"
          >
            <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 
              transform transition-all duration-200 ease-out
              hover:scale-[1.01] hover:border-zinc-700
              active:scale-[0.98]
              group-hover:shadow-md group-hover:shadow-blue-500/10
              cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
                Customer Onboarding Assistant
                <svg 
                  className="w-5 h-5 ml-2 transform transition-transform duration-200 group-hover:translate-x-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </h2>
              <p className="text-gray-300">Get help with account setup, verification, and investment solutions.</p>
            </div>
          </Link>

          <Link 
            href="/video-scripting"
            className="group"
          >
            <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 
              transform transition-all duration-200 ease-out
              hover:scale-[1.01] hover:border-zinc-700
              active:scale-[0.98]
              group-hover:shadow-md group-hover:shadow-blue-500/10
              cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
                Video Scripting Assistant
                <svg 
                  className="w-5 h-5 ml-2 transform transition-transform duration-200 group-hover:translate-x-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </h2>
              <p className="text-gray-300">Create engaging video scripts tailored to your needs.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
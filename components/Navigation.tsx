import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/" className="flex items-center space-x-2">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="font-bold text-xl text-gray-900">Split</span>
      </Link>

      <div className="flex items-center space-x-6">
        {/* Increased space-x to 6 for more spacing between links */}
        <Link href="/group" className="text-gray-700 hover:text-gray-900">
          Create Group
        </Link>
        <Link href="/expense" className="text-gray-700 hover:text-gray-900">
          Add Expense
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}

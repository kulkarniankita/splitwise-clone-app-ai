import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/" className="flex items-center space-x-2">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-current"
          style={{ fill: '#6200EA' }}
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="font-bold text-xl" style={{ color: '#6200EA' }}>
          Split
        </span>
      </Link>

      <div className="flex items-center space-x-12">
        {/* Added new link for 'Your Groups' */}
        <Link
          href="/groups"
          className="text-gray-700 hover:text-gray-900 hover:underline"
        >
          Your Groups
        </Link>
        <Link
          href="/group"
          className="text-gray-700 hover:text-gray-900 hover:underline"
        >
          Create Group
        </Link>
        <Link
          href="/expense"
          className="text-gray-700 hover:text-gray-900 hover:underline"
        >
          Add Expense
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}

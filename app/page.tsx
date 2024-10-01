'use client';

import React from 'react';
import { Users, UserPlus, LineChart } from 'lucide-react';
import Banner from '@/components/Banner';
import FeatureCard from '@/components/FeatureCard';

export default function LandingPage() {
  return (
    <div className="min-h-screen text-gray-900">
      {/* Hero Section */}
      <Banner />
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Why use Split?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            Icon={Users}
            title="Group expense tracking"
            description="Easily add group members to your expense. All the expenses are added up and divided by the number of people in the group."
          />
          <FeatureCard
            Icon={UserPlus}
            title="Individual expense addition"
            description="Add expenses to your group. You can add your expenses, and they will be automatically added to your group's expenses."
          />
          <FeatureCard
            Icon={LineChart}
            title="Expense viewing"
            description="View all your expenses in one place. You can see how much you've spent and how much you owe."
          />
        </div>
      </div>
      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
        By using Split, you agree to our Terms of Service and Privacy Policy
      </footer>
    </div>
  );
}

import React from 'react';

interface FeatureCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export default function FeatureCard({
  Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-gray-900 text-center">
      {' '}
      {/* Center text */}
      <div className="flex items-center justify-center mb-4">
        <Icon className="h-12 w-12 text-purple-600" /> {/* Update icon color */}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

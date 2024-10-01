'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useOrganizationList, useUser } from '@clerk/nextjs';

// Define the type for group
type Group = {
  id: string; // Add id property
  name: string;
  role: string;
  initials: string;
};

const GroupItem = ({
  name,
  role,
  initials,
  id,
}: {
  name: string;
  role: string;
  initials: string;
  id: string;
}) => (
  <Link href={`/group/${id}`}>
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow mb-4">
      {' '}
      {/* Added margin-bottom for spacing */}
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
        {initials}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-500 text-sm">
          {role === 'org:admin' ? 'Admin' : 'Member'}
        </p>
      </div>
    </div>
  </Link>
);

const YourGroups = () => {
  const [groups, setGroups] = useState<Array<Group>>([]);
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: true,
  });
  const { user } = useUser();

  useEffect(() => {
    if (isLoaded && userMemberships.data) {
      const userGroups = userMemberships.data.map((membership) => {
        const name = membership.organization.name;
        const role = membership.role;
        const initials = name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase();
        return {
          id: membership.organization.id, // Add this line
          name,
          role,
          initials,
        };
      });
      setGroups(userGroups);
    }
  }, [isLoaded, userMemberships.data]);

  if (!isLoaded || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Groups</h1>
      <p className="text-gray-600 mb-6">
        View and manage all your groups in one place. You can see the groups
        you&apos;re a part of, your role in each group, and easily access each
        group&apos;s details.
      </p>
      <div className="space-y-8">
        {groups.map((group, index) => (
          <GroupItem key={index} {...group} id={group.id} />
        ))}
      </div>
      <Link href="/group">
        <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center p-4 rounded-lg shadow mb-4">
          {' '}
          {/* Added margin-bottom for spacing */}
          <Plus className="w-4 h-4 mr-2" />
          Create New Group
        </Button>
      </Link>
    </div>
  );
};

export default YourGroups;

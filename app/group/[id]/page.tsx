'use client';

import { useOrganizationList } from '@clerk/nextjs';
import { useParams } from 'next/navigation';

export default function GroupPage() {
  const { id } = useParams();
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const organization = userMemberships.data?.find(
    (membership) => membership.organization.id === id
  );

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Group: {organization.organization.name}
      </h1>
      <p>Organization ID: {id}</p>
    </div>
  );
}

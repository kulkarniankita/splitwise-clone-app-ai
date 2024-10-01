'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useOrganization, useOrganizationList, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { addExpense } from '../actions';

// ... (rest of the code remains unchanged)

interface Organization {
  id: string;
  name: string;
}

interface Member {
  id: string;
  name: string;
}

interface SplitMember {
  id: string;
  name: string;
}

export default function AddExpense() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState('');
  const [splitPercentage, setSplitPercentage] = useState('');
  const [splitWith, setSplitWith] = useState<SplitMember[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const { user, isLoaded: isUserLoaded } = useUser();
  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList({
    userMemberships: true,
  });
  const { isLoaded: isOrgLoaded } = useOrganization();
  const { toast } = useToast();

  useEffect(() => {
    if (isOrgListLoaded && userMemberships.data) {
      const orgs = userMemberships.data.map((membership) => ({
        id: membership.organization.id,
        name: membership.organization.name,
      }));
      console.log('Organizations fetched:', orgs);
      setOrganizations(orgs);

      // Set the first organization as default and fetch its members
      if (orgs.length > 0 && !group) {
        const defaultOrgId = orgs[0].id;
        setGroup(defaultOrgId);
        fetchMembers(defaultOrgId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrgListLoaded, userMemberships.data, group]);

  const fetchMembers = async (orgId: string) => {
    try {
      const org = await userMemberships.data?.find(
        (membership) => membership.organization.id === orgId
      )?.organization;
      if (org) {
        const memberships = await org.getMemberships();
        const membersList = memberships.data.map((membership) => ({
          id: membership.publicUserData.userId ?? '',
          name: `${membership.publicUserData.firstName ?? ''} ${
            membership.publicUserData.lastName ?? ''
          }`.trim(),
        }));
        setMembers(membersList);
        console.log('Members fetched:', membersList);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch group members. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleGroupChange = (orgId: string) => {
    setGroup(orgId);
    fetchMembers(orgId);
    setSplitWith([]); // Reset split with when group changes
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUserLoaded || !user) {
      toast({
        title: 'Oops! 😅',
        description:
          "You need to be logged in to add an expense. Let's get you signed in!",
        variant: 'destructive',
      });
      return;
    }

    const expenseData = {
      amount: parseFloat(amount),
      description,
      groupId: group,
      splitPercentage: parseFloat(splitPercentage),
      splitWith: splitWith.map((member) => ({
        id: member.id,
        name: member.name,
      })),
      createdBy: user.id,
    };

    try {
      const result = await addExpense(expenseData);
      if (result.success) {
        toast({
          title: 'Expense Added! 🎉',
          description:
            'Your expense has been successfully recorded. Great job!',
        });

        // Reset form
        setAmount('');
        setDescription('');
        setGroup('');
        setSplitPercentage('');
        setSplitWith([]);
      } else {
        throw new Error('Failed to add expense');
      }
    } catch (error: unknown) {
      console.error('Error adding expense:', error);
      toast({
        title: 'Uh-oh! 😟',
        description: "We couldn't add your expense. Let's give it another try!",
        variant: 'destructive',
      });
    }
  };

  if (!isUserLoaded || !isOrgListLoaded || !isOrgLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Add an expense</h1>
      <p className="text-gray-600 mb-6">
        Record your expenses and split them with your group.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="$0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </Label>
          <Input
            id="description"
            placeholder="What did you pay for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <Label
            htmlFor="group"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Group
          </Label>
          {organizations.length > 0 ? (
            <Select onValueChange={handleGroupChange} value={group} required>
              <SelectTrigger id="group" className="w-full">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm text-gray-500">
              No groups available. Please create or join a group first.
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="splitPercentage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Split Percentage
          </Label>
          <Input
            id="splitPercentage"
            type="number"
            placeholder="Enter percentage to split"
            value={splitPercentage}
            onChange={(e) => setSplitPercentage(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label
            htmlFor="splitWith"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Split with
          </Label>
          <Select
            onValueChange={(value) => {
              const selectedMember = members.find(
                (member) => member.id === value
              );
              if (selectedMember) {
                if (
                  splitWith.some((member) => member.id === selectedMember.id)
                ) {
                  setSplitWith(
                    splitWith.filter(
                      (member) => member.id !== selectedMember.id
                    )
                  );
                } else {
                  setSplitWith([
                    ...splitWith,
                    { id: selectedMember.id, name: selectedMember.name },
                  ]);
                }
              }
            }}
            disabled={!group}
          >
            <SelectTrigger id="splitWith" className="w-full">
              <SelectValue placeholder="Select members to split with" />
            </SelectTrigger>
            <SelectContent>
              {members.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Save Expense
        </Button>
      </form>
    </div>
  );
}

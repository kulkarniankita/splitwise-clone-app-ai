'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useOrganizationList, useUser } from '@clerk/nextjs';
import { getGroupData, deleteExpense } from '@/app/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Define interfaces for Balance and Expense
interface Balance {
  name: string;
  amount: number;
  owes: boolean;
}

interface Expense {
  id: string;
  amount: number;
  description: string;
  created_by: string;
  split_with: {
    id: string;
    name: string;
    splitAmount: number;
  }[];
}

// Add this utility function at the top of the file, outside the component
const formatAmount = (amount: number | string) => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return numAmount.toFixed(2);
};

function GroupPage() {
  const { id } = useParams();
  const { userMemberships, isLoaded: orgLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      if (id && user) {
        const { expenses, balances } = await getGroupData(
          id as string,
          user.fullName || 'You'
        );
        setExpenses(expenses);
        setBalances(balances);
        setLoading(false);
      }
    }
    if (userLoaded) {
      fetchData();
    }
  }, [id, user, userLoaded]);

  if (!orgLoaded || !userLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const selectedOrganization = userMemberships.data?.find(
    (membership) => membership.organization.id === id
  );

  if (!selectedOrganization) {
    return <div>Organization not found</div>;
  }

  // Update the isAdmin check to match the groups page
  const isAdmin = selectedOrganization?.role === 'org:admin';

  console.log('Selected Organization:', selectedOrganization);
  console.log('Is Admin:', isAdmin);

  const groupDescription =
    "View and manage the details of your group. You can see the group's name, balances, and expenses. As an admin, you can also delete expenses.";

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (): string => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!isAdmin) {
      toast({
        title: 'Error 🚨',
        description: 'Only admins can delete expenses. 🚫',
        variant: 'destructive',
      });
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this expense?'
    );
    if (confirmed) {
      const result = await deleteExpense(expenseId);
      if (result.success) {
        // Refresh the page data
        const { expenses: updatedExpenses, balances: updatedBalances } =
          await getGroupData(id as string, user?.fullName || 'You');
        setExpenses(updatedExpenses);
        setBalances(updatedBalances);
        router.refresh(); // Refresh the page to update any server-side rendered content
      } else {
        toast({ title: 'Failed to delete expense. Please try again.' });
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4">
          {selectedOrganization.organization.name}
        </h1>

        <Link href="/groups">
          <Button className="bg-purple-600 text-white px-4 py-2 rounded-md">
            All Groups
          </Button>
        </Link>
      </div>

      <p className="text-gray-600 mb-8">{groupDescription}</p>

      <h2 className="text-2xl font-semibold mb-4">Balances</h2>
      {balances.length > 0 ? (
        balances.map((balance, index) => (
          <Card key={index} className="mb-8">
            <CardContent className="flex items-center p-6">
              <div
                className={`h-10 w-10 ${getRandomColor()} rounded-full mr-4 flex items-center justify-center text-white font-semibold`}
              >
                {getInitials(balance.name)}
              </div>
              <div>
                <h3 className="font-semibold">{balance.name}</h3>
                <p className="text-sm text-gray-600">
                  Owes you ${formatAmount(balance.amount)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-600 mb-8">
          🌟 No outstanding balances. Everyone&apos;s all squared up! 🎉
        </p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <Card key={expense.id} className="mb-4">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center">
                <div
                  className={`h-10 w-10 ${getRandomColor()} rounded-full mr-4 flex items-center justify-center text-white font-semibold`}
                >
                  {getInitials(expense.description)}
                </div>
                <div>
                  <h3 className="font-semibold">{expense.description}</h3>
                  <p className="text-sm text-gray-600">
                    ${formatAmount(expense.amount)} ·
                    {expense.split_with.map((s) => s.name).join(', ')}
                  </p>
                  <p className="text-xs text-gray-500">
                    Split type: Percentage{' '}
                    {(
                      (expense.split_with[0]?.splitAmount / expense.amount) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                </div>
              </div>
              <Trash2
                className="text-red-500 cursor-pointer"
                size={20}
                onClick={() => handleDeleteExpense(expense.id)}
              />
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-600 mb-8">
          💸 No expenses yet. Time to split some bills! 🧾
        </p>
      )}
    </div>
  );
}

export default GroupPage;

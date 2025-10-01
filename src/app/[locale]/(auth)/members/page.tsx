'use client';

import React from 'react';

import { type Member, MembersList } from '@/components/admin/members-list';
import { useToast } from '@/components/ui/toast';

export default function MembersPage() {
  const { addToast } = useToast();
  const [members, setMembers] = React.useState<Member[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [totalCount, setTotalCount] = React.useState(0);

  const fetchMembers = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/clerk-members');
      const data = await response.json();

      if (data.ok) {
        setMembers(data.members);
        setTotalCount(data.totalCount);
        // Members fetched successfully
      } else {
        addToast({
          type: 'error',
          title: 'Error',
          description: 'Failed to fetch members',
        });
      }
    } catch {
      // Error handling
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to fetch members',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleInvite = () => {
    addToast({
      type: 'info',
      title: 'Invite Member',
      description: 'Invite functionality would be implemented here',
    });
  };

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      // Here you would call an API to update the role
      // Changing role

      // Update local state
      setMembers(prev => prev.map(member =>
        member.id === memberId
          ? { ...member, role: newRole }
          : member,
      ));

      addToast({
        type: 'success',
        title: 'Role Updated',
        description: `Member role changed to ${newRole}`,
      });
    } catch {
      // Error handling
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to update member role',
      });
    }
  };

  const handleRemove = async (memberId: string) => {
    try {
      // Here you would call an API to remove the member
      // Remove member logic here

      // Update local state
      setMembers(prev => prev.filter(member => member.id !== memberId));
      setTotalCount(prev => prev - 1);

      addToast({
        type: 'success',
        title: 'Member Removed',
        description: 'Member has been removed from the organization',
      });
    } catch (error) {
      console.error('Error removing member:', error);
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to remove member',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
        <p className="text-muted-foreground">
          Manage your organization members and their roles.
        </p>
      </div>

      {/* Members List */}
      <MembersList
        members={members}
        totalCount={totalCount}
        loading={loading}
        onInvite={handleInvite}
        onRoleChange={handleRoleChange}
        onRemove={handleRemove}
      />
    </div>
  );
}

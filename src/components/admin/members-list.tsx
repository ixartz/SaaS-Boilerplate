'use client';

import { Crown, MoreHorizontal, Search, Shield, User, UserPlus } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export type Member = {
  id: string;
  clerkUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: string;
  imageUrl: string;
  createdAt: string;
  isCurrentUser: boolean;
};

type MembersListProps = {
  members: Member[];
  totalCount: number;
  loading?: boolean;
  onInvite?: () => void;
  onRoleChange?: (memberId: string, newRole: string) => void;
  onRemove?: (memberId: string) => void;
};

const roleIcons = {
  admin: Crown,
  moderator: Shield,
  member: User,
};

const roleColors = {
  admin: 'bg-red-100 text-red-800',
  moderator: 'bg-blue-100 text-blue-800',
  member: 'bg-gray-100 text-gray-800',
};

export function MembersList({
  members,
  totalCount,
  loading = false,
  onInvite,
  onRoleChange,
  onRemove,
}: MembersListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredMembers = members.filter(member =>
    member.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    || member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const getRoleIcon = (role: string) => {
    const IconComponent = roleIcons[role as keyof typeof roleIcons] || User;
    return <IconComponent className="size-4" />;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="size-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Members</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalCount}
{' '}
member
{totalCount !== 1 ? 's' : ''}
{' '}
in your organization
            </p>
          </div>
          <Button onClick={onInvite} className="bg-black hover:bg-gray-800">
            <UserPlus className="mr-2 size-4" />
            Invite
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Members Table */}
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0
? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    {searchTerm ? 'No members found matching your search.' : 'No members found.'}
                  </TableCell>
                </TableRow>
              )
: (
                filteredMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={member.imageUrl}
                            alt={member.displayName}
                            className="size-10 rounded-full object-cover"
                          />
                          {member.isCurrentUser && (
                            <div className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-blue-500">
                              <span className="text-xs font-bold text-white">✓</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{member.displayName}</p>
                            {member.isCurrentUser && (
                              <Badge variant="secondary" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(member.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(member.role)}
                        <Badge
                          className={`${roleColors[member.role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'} capitalize`}
                        >
                          {member.role}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {!member.isCurrentUser && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onRoleChange?.(member.id, 'admin')}>
                              <Crown className="mr-2 size-4" />
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onRoleChange?.(member.id, 'moderator')}>
                              <Shield className="mr-2 size-4" />
                              Make Moderator
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onRoleChange?.(member.id, 'member')}>
                              <User className="mr-2 size-4" />
                              Make Member
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onRemove?.(member.id)}
                              className="text-red-600"
                            >
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

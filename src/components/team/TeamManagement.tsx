import React, { useState } from 'react';
import { Plus, Mail, MoreVertical, Crown, User, Eye } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { TeamMember } from '../../types';
import { useOrganization } from '../../contexts/OrganizationContext';

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    userId: '1',
    organizationId: '1',
    role: 'admin',
    status: 'active',
    invitedAt: '2024-01-15T08:00:00Z',
    joinedAt: '2024-01-15T08:00:00Z',
    user: {
      id: '1',
      email: 'john@company.com',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face',
      role: 'admin'
    }
  },
  {
    id: '2',
    userId: '2',
    organizationId: '1',
    role: 'member',
    status: 'active',
    invitedAt: '2024-01-20T09:00:00Z',
    joinedAt: '2024-01-20T09:30:00Z',
    user: {
      id: '2',
      email: 'sarah@company.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150&h=150&fit=crop&crop=face',
      role: 'member'
    }
  },
  {
    id: '3',
    userId: '3',
    organizationId: '1',
    role: 'viewer',
    status: 'pending',
    invitedAt: '2024-01-25T10:00:00Z',
    user: {
      id: '3',
      email: 'mike@company.com',
      firstName: 'Mike',
      lastName: 'Wilson',
      role: 'viewer'
    }
  }
];

export const TeamManagement: React.FC = () => {
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'member'
  });
  const [inviteLoading, setInviteLoading] = useState(false);
  const { currentOrganization } = useOrganization();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-amber-600" />;
      case 'member':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'viewer':
        return <Eye className="w-4 h-4 text-gray-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-amber-100 text-amber-800',
      inactive: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    
    // Simulate sending invitation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate invitation URL (in real app, this would come from backend)
    const invitationToken = 'inv_' + Date.now();
    const invitationUrl = `${window.location.origin}/invitation?invitation_token=${invitationToken}`;
    
    console.log('Invitation sent to:', inviteData.email);
    console.log('Invitation URL:', invitationUrl);
    
    // Reset form
    setInviteData({ email: '', role: 'member' });
    setShowInviteForm(false);
    setInviteLoading(false);
    
    // In a real app, you would send this URL via email
    alert(`Invitation sent! URL: ${invitationUrl}`);
  };

  const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInviteData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600">Manage your team members and their permissions</p>
        </div>
        <Button onClick={() => setShowInviteForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {showInviteForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="email"
                  name="email"
                  value={inviteData.email}
                  onChange={handleInviteChange}
                  placeholder="Email address"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select 
                  name="role"
                  value={inviteData.role}
                  onChange={handleInviteChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="flex space-x-2">
                  <Button type="submit" loading={inviteLoading}>
                    Send Invite
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {member.user.avatar ? (
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={member.user.avatar}
                            alt={`${member.user.firstName} ${member.user.lastName}`}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.user.firstName} {member.user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{member.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRoleIcon(member.role)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">{member.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : 'Pending'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
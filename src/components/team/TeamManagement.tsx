import React, { useEffect, useMemo, useState } from 'react';
import { Plus, MoreVertical, Crown, User, Eye } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { useOrganization } from '../../contexts/OrganizationContext';
import { InviteAPI, InvitationWire } from '../../services/invite';
import { showToast } from '../utils/showToast';

type NormalizedInvite = {
  id: string;
  role: string;
  status: string;
  email: string;
  invitedAt: string;
};

function normalizeInvitation(i: any): NormalizedInvite {
  // Defensive mapping with sane defaults
  const id = typeof i?.Id === 'string' && i.Id.trim() ? i.Id : crypto.randomUUID();
  const role = typeof i?.Role === 'string' && i.Role.trim() ? i.Role : 'Member';
  const status = typeof i?.Status === 'string' && i.Status.trim() ? i.Status : 'Invited';
  const email = typeof i?.Email === 'string' ? i.Email : '';
  const invitedAt = typeof i?.InvitedDate === 'string' && i.InvitedDate
    ? i.InvitedDate
    : new Date().toISOString();
  return { id, role, status, email, invitedAt };
}

function safeDateLabel(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return '—';
  try {
    return new Date(t).toLocaleString();
  } catch {
    return '—';
  }
}

export const TeamManagement: React.FC = () => {
  // Invite form state
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteData, setInviteData] = useState<{ email: string; roleId: string }>({
    email: '',
    roleId: ''
  });
  const [inviteLoading, setInviteLoading] = useState(false);

  // From Organization context
  const { currentOrganization, tenantRoles, inviteMember, loading: orgLoading } = useOrganization();

  // Invitations list state
  const [invites, setInvites] = useState<NormalizedInvite[]>([]);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [invitesError, setInvitesError] = useState<string | null>(null);

  // Default role once roles arrive
  useEffect(() => {
    if (!inviteData.roleId && tenantRoles.length > 0) {
      setInviteData((d) => ({ ...d, roleId: tenantRoles[0].id }));
    }
  }, [tenantRoles, inviteData.roleId]);

  // Fetch invitations when org changes
  useEffect(() => {
    const orgId = currentOrganization?.id;
    if (!orgId) {
      setInvites([]);
      return;
    }

    let mounted = true;
    (async () => {
      setInvitesLoading(true);
      setInvitesError(null);
      try {
        const res = await InviteAPI.list(orgId);
        const mapped = (res.invitations ?? [])
          .filter(Boolean)
          .map((i: InvitationWire) => normalizeInvitation(i));
        if (mounted) setInvites(mapped);
      } catch (e: any) {
        if (mounted) setInvitesError(e?.message || 'Failed to load invitations.');
      } finally {
        if (mounted) setInvitesLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [currentOrganization?.id]);
  
  const getStatusBadge = (status?: string) => {
    const s = (status || 'invited').toLowerCase();
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-amber-100 text-amber-800',
      invited: 'bg-amber-100 text-amber-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    const cls = styles[s] || 'bg-gray-100 text-gray-800';
    const label = s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
        {label}
      </span>
    );
  };

  const roleNameById = useMemo(() => {
    const map = new Map<string, string>();
    tenantRoles.forEach(r => map.set(r.id, r.name));
    return map;
  }, [tenantRoles]);

  const reloadInvites = async () => {
    if (!currentOrganization?.id) return;
    setInvitesLoading(true);
    setInvitesError(null);
    try {
      const res = await InviteAPI.list(currentOrganization.id);
      const mapped = (res.invitations ?? [])
        .filter(Boolean)
        .map((i: InvitationWire) => normalizeInvitation(i));
      setInvites(mapped);
    } catch (e: any) {
      setInvitesError(e?.message || 'Failed to load invitations.');
    } finally {
      setInvitesLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);

    try {
      if (!currentOrganization?.id) {
        throw new Error('No current organization selected.');
      }
      const email = inviteData.email.trim();
      if (!email) throw new Error('Email is required.');
      if (!inviteData.roleId) throw new Error('Role is required.');

      const res = await inviteMember({ email, roleId: inviteData.roleId });
      if(res?.success){
        showToast('Invitation sent successfully', 'success');
      }else{
        showToast('Failed to send invitation', 'error');
      }
      // Reset UI + refresh invites
      const defaultRole = tenantRoles[0]?.id ?? '';
      setInviteData({ email: '', roleId: defaultRole });
      setShowInviteForm(false);
      await reloadInvites();
    } catch (err: any) {
      showToast(err?.message || 'Failed to send invitation', 'error');
    } finally {
      setInviteLoading(false);
    }
  };

  const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInviteData(prev => ({ ...prev, [name]: value }));
  };

  const rolesLoading = orgLoading && tenantRoles.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600">
            Manage your team members and invitations
            {currentOrganization ? (
              <span className="ml-1 text-gray-500">
                (Org: <b>{currentOrganization.name}</b>)
              </span>
            ) : null}
          </p>
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
                  name="roleId"
                  value={inviteData.roleId}
                  onChange={handleInviteChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={rolesLoading}
                  required
                >
                  {rolesLoading && <option value="">Loading roles…</option>}
                  {!rolesLoading && tenantRoles.length === 0 && (
                    <option value="">No roles available</option>
                  )}
                  {!rolesLoading &&
                    tenantRoles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                </select>

                <div className="flex space-x-2">
                  <Button type="submit" loading={inviteLoading || rolesLoading}>
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
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Invitations</h3>
        </CardHeader>
        <CardContent className="p-0">
          {invitesLoading ? (
            <div className="p-6 text-gray-600">Loading invitations…</div>
          ) : invitesError ? (
            <div className="p-6 text-red-600">{invitesError}</div>
          ) : invites.length === 0 ? (
            <div className="p-6 text-gray-600">No invitations yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invited On
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invites.filter(Boolean).map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {inv.email || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                         <User className="w-4 h-4 text-blue-600" />
                          <span className="ml-2 text-sm text-gray-900">{inv.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(inv.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {safeDateLabel(inv.invitedAt)}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

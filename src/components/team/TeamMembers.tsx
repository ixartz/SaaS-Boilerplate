// src/components/team/TeamMembers.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, User, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { useOrganization } from '../../contexts/OrganizationContext';
import { showToast } from '../utils/showToast';
import InviteMemberModal from './InviteMemberModal';
import SkeletonTable from '../ui/SkeletonTable';
import { OrganizationAPI } from '../../services/organization';

type MemberWire = {
  Email: string;
  Uid: string;
  Role: { Id: string; Name: string };
  Permissions?: { Id: string; Name: string }[];
};

type NormalizedMember = {
  uid: string;
  email: string;
  roleId: string;
  roleName: string;
  permissions: string[];
  isSelf?: boolean;
};

function baseNormalizeMember(m: MemberWire): NormalizedMember {
  return {
    uid: m?.Uid || '',
    email: m?.Email || '',
    roleId: m?.Role?.Id || '',
    roleName: m?.Role?.Name || 'member',
    permissions: Array.isArray(m?.Permissions) ? m.Permissions.map(p => p?.Name).filter(Boolean) : []
  };
}

export const TeamMembers: React.FC = () => {
  const { currentOrganization, tenantRoles, inviteMember, viewerUid, viewerEmail } = useOrganization();
    console
  const [inviteOpen, setInviteOpen] = useState(false);
  const [members, setMembers] = useState<NormalizedMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState<string | null>(null);

  // Fallback meta from backend (in case isSelf tagging fails)
  const [viewerPerms, setViewerPerms] = useState<string[]>([]);
  const [viewerRoleName, setViewerRoleName] = useState<string>('');
    console.log(viewerUid)
  // Load members and tag the current viewer via uid or email, plus capture meta
  const loadMembers = async (orgId: string) => {
    setMembersLoading(true);
    setMembersError(null);
    try {
      const res = await OrganizationAPI.memberList(orgId);
      const data = (res as any)?.data ?? res ?? {};

      // Try to read viewer identity from API meta first...
      const apiViewerUid: string =
        data.viewerUid ??
        data.currentUid ??
        data.viewer_uid ??
        data.meta?.viewerUid ??
        data.me?.Uid ??
        data.me?.UID ??
        '';

      const apiViewerEmail: string =
        data.viewerEmail ??
        data.viewer_email ??
        data.me?.Email ??
        data.profile?.Email ??
        '';

        console.log(data.currentUid)
      // ...then fall back to context if API didn't provide it
      const vUid = apiViewerUid || viewerUid || '';
      const vEmail = (apiViewerEmail || viewerEmail || '').toLowerCase();

      // Capture fallback meta for viewer role/permissions, if provided
      const metaPerms: string[] = Array.isArray(data.viewerPermissions) ? data.viewerPermissions : [];
      const metaRoleName: string = data.viewerRoleName ?? data.viewerRole?.Name ?? '';
      setViewerPerms(metaPerms);
      setViewerRoleName(metaRoleName);

      const raw = data.members ?? [];
      const mapped: NormalizedMember[] = raw.map((mw: MemberWire) => {
        const n = baseNormalizeMember(mw);

        // tag self by API meta first
        if (apiViewerUid && n.uid) n.isSelf = n.uid === apiViewerUid;
        if (!n.isSelf && apiViewerEmail && n.email) {
          n.isSelf = n.email.toLowerCase() === apiViewerEmail.toLowerCase();
        }

        // fallback to context if still not tagged
        if (!n.isSelf && vUid && n.uid) n.isSelf = n.uid === vUid;
        if (!n.isSelf && vEmail && n.email) n.isSelf = n.email.toLowerCase() === vEmail;

        return n;
      });

      setMembers(mapped);
    } catch (e: any) {
      setMembersError(e?.message || 'Failed to load members.');
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    const orgId = currentOrganization?.id;
    if (!orgId) {
      setMembers([]);
      setViewerPerms([]);
      setViewerRoleName('');
      return;
    }
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await loadMembers(orgId);
    })();
    return () => {
      mounted = false;
    };
  }, [currentOrganization?.id, viewerUid, viewerEmail]);

  // Viewer flags: try from "me" row first, fall back to meta
  const me = useMemo(() => members.find(m => m.isSelf), [members]);

  // Accept several common permission spellings, case-insensitive
  const viewerHasTeamDelete = useMemo(() => {
    const perms = me?.permissions ?? viewerPerms;
    const norm = (perms || []).map(p => (p || '').toLowerCase());
    return norm.includes('team:delete') || norm.includes('member:delete') || norm.includes('org:members:delete');
  }, [me, viewerPerms]);

  const viewerIsOwner = useMemo(() => {
    const role = me?.roleName ?? viewerRoleName;
    return (role || '').toLowerCase() === 'owner';
  }, [me, viewerRoleName]);

  // Allow delete if Owner OR has delete permission; never allow self-delete
  const canDelete = (target: NormalizedMember) =>
    !target.isSelf && (viewerIsOwner || viewerHasTeamDelete);

  const noPermReason = (target: NormalizedMember) => {
    if (target.isSelf) return "You can't delete yourself";
    if (viewerIsOwner || viewerHasTeamDelete) return '';
    return 'You do not have permission to remove members';
  };

  const reloadMembers = async () => {
    if (!currentOrganization?.id) return;
    await loadMembers(currentOrganization.id);
  };

  const onInvite = async ({ email, roleId }: { email: string; roleId: string }) => {
    try {
      const res = await inviteMember({ email, roleId });
      if ((res as any)?.success) {
        showToast('Invitation sent successfully', 'success');
      } else {
        showToast((res as any)?.Message || 'Failed to send invitation', 'error');
      }
      return res;
    } catch (err: any) {
      showToast(err?.message || 'Failed to send invitation', 'error');
      return null;
    }
  };

  const handleDeleteMember = async (m: NormalizedMember) => {
    if (!currentOrganization?.id) return;
    if (!canDelete(m)) {
      const reason = noPermReason(m);
      if (reason) showToast(reason, 'error');
      return;
    }
    try {
      await OrganizationAPI.removeMember(currentOrganization.id, m.uid);
      showToast('Member removed', 'success');
      await reloadMembers();
    } catch (e: any) {
      showToast(e?.message || 'Failed to remove member', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
          <p className="text-gray-600">
            Manage your organization members
            {currentOrganization ? (
              <span className="ml-1 text-gray-500">
                (Org: <b>{currentOrganization.name}</b>)
              </span>
            ) : null}
          </p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Invite Modal */}
      <InviteMemberModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        roles={tenantRoles}
        onInvite={onInvite}
      />

      {/* Members Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Members</h3>
        </CardHeader>
        <CardContent className="p-0">
          {membersLoading ? (
            <SkeletonTable columns={['Email', 'UID', 'Role', 'Permissions', 'Actions']} rows={8} />
          ) : membersError ? (
            <div className="p-6 text-red-600">{membersError}</div>
          ) : members.length === 0 ? (
            <div className="p-6 text-gray-600">No members yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">UID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissions</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((m) => {
                    const canDeleteThisRow = canDelete(m);

                    return (
                      <tr
                        key={m.uid}
                        className={`transition-colors hover:bg-gray-50`}
                      >
                        {/* Email + avatar + (You) */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                              {m.email?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{m.email || '—'}</div>
                            </div>
                          </div>
                        </td>

                        {/* UID */}
                        <td className="px-6 py-4 text-sm text-gray-900">{m.uid || '—'}</td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-blue-600" />
                            <span className="ml-2 text-sm text-gray-900">
                              {m.roleName}
                              {m.isSelf ? ' (You)' : ''}
                            </span>
                          </div>
                        </td>

                        {/* Permissions */}
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {m.permissions.length === 0 ? (
                              <span className="text-sm text-gray-500">—</span>
                            ) : (
                              m.permissions.map((p) => (
                                <span
                                  key={p}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800"
                                >
                                  {p}
                                </span>
                              ))
                            )}
                          </div>
                        </td>

                        {/* Remove action */}
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <button
                            type="button"
                            aria-disabled={!canDeleteThisRow}
                            disabled={!canDeleteThisRow}
                            onClick={() => handleDeleteMember(m)}
                            title={canDeleteThisRow ? 'Remove member' : noPermReason(m)}
                            className={`p-1 rounded transition-colors ${
                              canDeleteThisRow
                                ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

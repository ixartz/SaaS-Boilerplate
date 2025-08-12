// src/components/team/TeamManagement.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, MoreVertical, User, RefreshCcw, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { useOrganization } from '../../contexts/OrganizationContext';
import { InviteAPI, InvitationWire } from '../../services/invite';
import { showToast } from '../utils/showToast';
import InviteMemberModal from './InviteMemberModal';
import Pagination from './Pagination';
import SkeletonTable from '../ui/SkeletonTable';

type NormalizedInvite = {
  id: string;
  role: string;
  status: string;
  email: string;
  invitedAt: string;
};

function normalizeInvitation(i: any): NormalizedInvite {
  const id = typeof i?.Id === 'string' && i.Id.trim() ? i.Id : crypto.randomUUID();
  const role = typeof i?.Role === 'string' && i.Role.trim() ? i.Role : 'Member';
  const status = typeof i?.Status === 'string' && i.Status.trim() ? i.Status : 'Invited';
  const email = typeof i?.Email === 'string' ? i.Email : '';
  const invitedAt =
    typeof i?.InvitedDate === 'string' && i.InvitedDate ? i.InvitedDate : new Date().toISOString();
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
  const { currentOrganization, tenantRoles, inviteMember, loading: orgLoading } = useOrganization();

  // Modal
  const [inviteOpen, setInviteOpen] = useState(false);

  // Invitations
  const [invites, setInvites] = useState<NormalizedInvite[]>([]);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [invitesError, setInvitesError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const rolesLoading = orgLoading && tenantRoles.length === 0;

  // Per-row actions/menu state
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [busyResendId, setBusyResendId] = useState<string | null>(null);
  const [busyRevokeId, setBusyRevokeId] = useState<string | null>(null);

  // Close menu on outside click / Esc
  useEffect(() => {
    if (!menuOpenId) return;

    const handleMouseDown = (e: MouseEvent) => {
      const menuEl = document.getElementById(`inv-actions-${menuOpenId}`);
      const toggleBtn = document.querySelector(`[data-inv-toggle="${menuOpenId}"]`);
      const target = e.target as Node;
      if (menuEl && !menuEl.contains(target) && toggleBtn && !toggleBtn.contains(target)) {
        setMenuOpenId(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpenId(null);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpenId]);

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
        const mapped = (res.invitations ?? []).filter(Boolean).map((i: InvitationWire) => normalizeInvitation(i));
        if (mounted) {
          setInvites(mapped);
          setPage(1); // reset page on org change
        }
      } catch (e: any) {
        if (mounted) setInvitesError(e?.message || 'Failed to load invitations.');
      } finally {
        if (mounted) setInvitesLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [currentOrganization?.id]);

  const total = invites.length;
  const pagedInvites = useMemo(() => {
    const start = (page - 1) * pageSize;
    return invites.slice(start, start + pageSize);
  }, [invites, page, pageSize]);

  const reloadInvites = async () => {
    if (!currentOrganization?.id) return;
    setInvitesLoading(true);
    setInvitesError(null);
    try {
      const res = await InviteAPI.list(currentOrganization.id);
      const mapped = (res.invitations ?? []).filter(Boolean).map((i: InvitationWire) => normalizeInvitation(i));
      setInvites(mapped);
    } catch (e: any) {
      setInvitesError(e?.message || 'Failed to load invitations.');
    } finally {
      setInvitesLoading(false);
    }
  };

  const isSuccess = (res: any) =>
    res === true || res?.success === true || res?.sucess === true || res?.Success === true;

  const onInvite = async ({ email, roleId }: { email: string; roleId: string }) => {
    try {
      const res = await inviteMember({ email, roleId });
      if (isSuccess(res)) {
        showToast('Invitation sent successfully', 'success');
        await reloadInvites();
      } else {
        showToast(res?.Message || 'Failed to send invitation', 'error');
      }
      return res;
    } catch (err: any) {
      showToast(err?.message || 'Failed to send invitation', 'error');
      return null;
    }
  };

  // Normalize status to a stable key
  const statusKey = (status?: string) => {
    switch ((status || '').toLowerCase()) {
      case 'invited': return 'invited';
      case 'revoked': return 'revoked';
      case 'accepted': return 'accepted';
      default: return 'other';
    }
  };

  // Visibility rules (per your latest instruction)
  // Invited  -> Resend + Revoke
  // Revoked  -> Resend only
  // Accepted -> none
  // New
  const showResendFor = (status?: string) => statusKey(status) === 'invited';
  const showRevokeFor = (status?: string) => statusKey(status) === 'invited';
  const showMenuFor = (status?: string) => statusKey(status) === 'invited';

  // Actions
  const onResend = async (inv: NormalizedInvite) => {
    if (!currentOrganization?.id) return;
    try {
      setBusyResendId(inv.id);
      const res = await InviteAPI.resend(inv.id, currentOrganization.id);
      if (isSuccess(res)) {
        showToast('Invitation resent', 'success');
        await reloadInvites();
      } else {
        showToast('Failed to resend invitation', 'error');
      }
    } catch (e: any) {
      showToast(e?.message || 'Failed to resend invitation', 'error');
    } finally {
      setBusyResendId(null);
      setMenuOpenId(null);
    }
  };

  const onRevoke = async (inv: NormalizedInvite) => {
    if (!currentOrganization?.id) return;
    try {
      setBusyRevokeId(inv.id);
      const res = await InviteAPI.delete(inv.id, currentOrganization.id);
      if (isSuccess(res)) {
        showToast('Invitation revoked', 'success');
        await reloadInvites();
      } else {
        showToast('Failed to revoke invitation', 'error');
      }
    } catch (e: any) {
      showToast(e?.message || 'Failed to revoke invitation', 'error');
    } finally {
      setBusyRevokeId(null);
      setMenuOpenId(null);
    }
  };

  const getStatusBadge = (status?: string) => {
    const s = statusKey(status);
    const styles: Record<string, string> = {
      invited: 'bg-amber-100 text-amber-800',
      revoked: 'bg-red-100 text-red-700',
      accepted: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800'
    };
    const label =
      s === 'other'
        ? (status || '—').charAt(0).toUpperCase() + (status || '—').slice(1)
        : s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[s]}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Invitations Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Invitations</h3>
        </CardHeader>
        <CardContent className="p-0">
          {invitesLoading ? (
            <SkeletonTable columns={['Email', 'Role', 'Status', 'Invited On', 'Actions']} rows={8} />
          ) : invitesError ? (
            <div className="p-6 text-red-600">{invitesError}</div>
          ) : total === 0 ? (
            <div className="p-6 text-gray-600">No invitations yet.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invited On</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pagedInvites.map((inv) => {
                      const isOpen = menuOpenId === inv.id;
                      const showMenu = showMenuFor(inv.status);
                      const isRowBusy = !!(busyResendId === inv.id || busyRevokeId === inv.id);

                      return (
                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.email || '—'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <User className="w-4 h-4 text-blue-600" />
                              <span className="ml-2 text-sm text-gray-900">{inv.role}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(inv.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {safeDateLabel(inv.invitedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative overflow-visible">
                            {showMenu ? (
                              <>
                                <button
                                  className={`text-gray-400 hover:text-gray-600 p-1 rounded ${isRowBusy ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                  onClick={() => !isRowBusy && setMenuOpenId(isOpen ? null : inv.id)}
                                  disabled={isRowBusy}
                                  aria-haspopup="menu"
                                  aria-expanded={isOpen}
                                  aria-controls={`inv-actions-${inv.id}`}
                                  data-inv-toggle={inv.id}
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>

                                {isOpen && (
                                  <div
                                    id={`inv-actions-${inv.id}`}
                                    role="menu"
                                    className="absolute right-4 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1"
                                  >
                                    {showResendFor(inv.status) && (
                                      <button
                                        role="menuitem"
                                        className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => onResend(inv)}
                                        disabled={busyResendId === inv.id}
                                      >
                                        <RefreshCcw className="w-3.5 h-3.5" />
                                        {busyResendId === inv.id ? 'Working…' : 'Resend'}
                                      </button>
                                    )}
                                    {showRevokeFor(inv.status) && (
                                      <button
                                        role="menuitem"
                                        className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => onRevoke(inv)}
                                        disabled={busyRevokeId === inv.id}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        {busyRevokeId === inv.id ? 'Working…' : 'Revoke'}
                                      </button>
                                    )}
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(1);
                }}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// src/components/team/InviteMemberModal.tsx
import React, { useEffect, useRef, useState } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";

type Role = { id: string; name: string };
type InviteResult = { success?: boolean; ErrorCode?: number; Message?: string } | null;

type Props = {
  open: boolean;
  onClose: () => void;
  roles: Role[];
  onInvite: (payload: { email: string; roleId: string }) => Promise<InviteResult>;
};

export default function InviteMemberModal({ open, onClose, roles, onInvite }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail("");
      setRoleId(roles[0]?.id ?? "");
      setError(null);
      setSubmitting(false);
      setTimeout(() => emailRef.current?.focus(), 0);
    }
  }, [open, roles]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !submitting && onClose();
    const onClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node) && !submitting) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose, submitting]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const em = email.trim();
    if (!em) return setError("Email is required.");
    if (!roleId) return setError("Role is required.");

    setSubmitting(true);
    try {
      const result = await onInvite({ email: em, roleId });
      if (result?.success) {
        onClose();
      } else {
        setError(result?.Message || "Failed to send invitation.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to send invitation.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="invite-title">
      <div ref={dialogRef} className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="invite-title" className="text-lg font-semibold">Invite Team Member</h2>
              <p className="text-sm text-gray-500">Send an invitation to join your organization</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" disabled={submitting} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="person@company.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={submitting}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={submitting || roles.length === 0}
                required
              >
                {roles.length === 0 ? <option value="">No roles</option> : roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50" disabled={submitting}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !email.trim() || !roleId}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50"
            >
              {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>) : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

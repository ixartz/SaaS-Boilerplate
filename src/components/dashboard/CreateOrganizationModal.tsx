import React, { useEffect, useRef, useState } from "react";
import { Building2, Globe, X, Loader2 } from "lucide-react";
import { useOrganization } from "../../contexts/OrganizationContext";
import { showToast } from "../utils/showToast";

type Props = { open: boolean; onClose: () => void };

export default function CreateOrganizationModal({ open, onClose }: Props) {
  const { createOrganization } = useOrganization();
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false); // ← local
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName("");
      setDomain("");
      setError(null);
      setSubmitting(false);
      setTimeout(() => nameRef.current?.focus(), 0);
    }
  }, [open]);

  // Close on ESC / click outside (but not while submitting)
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

  const onNameChange = (v: string) => {
    setName(v);
    setDomain(v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter an organization name.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await createOrganization({ name: trimmed, domain: domain.trim() });
      console.log(response)
      if (response?.success) {
        showToast(`Organization created successfully!`, "success");
        onClose();
      } else{
        showToast(response?.Message || "Failed to create organization.", "error");
      }
    } catch (err: any) {
      showToast(err?.Message || "Failed to create organization. Please try again.", "error");
      console.error("createOrganization error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-org-title"
    >
      <div ref={dialogRef} className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="create-org-title" className="text-lg font-semibold">Create Organization</h2>
              <p className="text-sm text-gray-500">Set up your workspace to get started</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={submitting}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Organization Name</label>
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Acme Corporation"
              className="w-full border rounded-lg p-2.5"
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Organization Domain</label>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="acme-corporation"
                className="flex-1 border rounded-lg p-2.5"
                disabled={submitting}
              />
            </div>
            <p className="text-xs text-gray-500">Domain is for display right now; backend creates with name only.</p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              aria-busy={submitting}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Organization"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

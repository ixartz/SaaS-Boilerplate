import React, { useEffect, useRef, useState } from "react";
import { Building2, Globe, X } from "lucide-react";
import { useOrganization } from "../../contexts/OrganizationContext";

// Simple accessible modal (no external deps)
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateOrganizationModal({ open, onClose }: Props) {
  const { createOrganization, loading, switchOrganization } = useOrganization();
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Reset form whenever opened
  useEffect(() => {
    if (open) {
      setName("");
      setDomain("");
      setError(null);
      setTimeout(() => nameRef.current?.focus(), 0);
    }
  }, [open]);

  // Close on ESC / click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose]);

  const onNameChange = (v: string) => {
    setName(v);
    setDomain(
      v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter an organization name.");
      return;
    }
    try {
      // createOrganization returns the created org (see tiny context tweak below)
      const created = await createOrganization({ name: trimmed });
      if (created?.id) {
        switchOrganization(created.id);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to create organization. Please try again.");
      // eslint-disable-next-line no-console
      console.error("createOrganization error:", err);
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
      <div
        ref={dialogRef}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="create-org-title" className="text-lg font-semibold">
                Create Organization
              </h2>
              <p className="text-sm text-gray-500">Set up your workspace to get started</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded hover:bg-gray-100"
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
              disabled={loading}
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
                disabled={loading}
              />
              <span className="text-sm text-gray-500">.company.com</span>
            </div>
            <p className="text-xs text-gray-500">
              Domain is for display right now; backend creates with name only.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Organization"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

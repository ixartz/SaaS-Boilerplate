// src/components/layout/OrganizationSwitcher.tsx
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Plus, Building2 } from "lucide-react";
import { useOrganization } from "../../contexts/OrganizationContext";
import CreateOrganizationModal from "../dashboard/CreateOrganizationModal";

function safeLabel(org: any): string {
  if (!org) return "Organization";
  return (
    (org.name ??
      org.Name ??
      org.slug ??
      org.Slug ??
      org.id ??
      org.Id ??
      "Organization") + ""
  );
}

function safeInitial(org: any): string {
  const label = safeLabel(org).trim();
  return label ? label.charAt(0).toUpperCase() : "O";
}

function safeId(org: any): string | null {
  return (org?.id ?? org?.Id ?? null) as string | null;
}

export const OrganizationSwitcher: React.FC = () => {
  const { organizations, currentOrganization, switchOrganization } = useOrganization();
  const [open, setOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Esc
  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const orgs = (organizations ?? []).filter(Boolean);

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((s) => !s)}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <Building2 className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">
            {currentOrganization ? safeLabel(currentOrganization) : "Switch Organization"}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Organizations
            </div>

            {orgs.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-600">No organizations yet.</div>
            ) : (
              orgs.map((org) => {
                const id = safeId(org);
                const label = safeLabel(org);
                const active = currentOrganization && safeId(currentOrganization) === id;

                return (
                  <button
                    key={id ?? label}
                    onClick={() => {
                      if (id) switchOrganization(id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 ${
                      active ? "bg-blue-50 text-blue-700" : "text-gray-700"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xs font-medium">{safeInitial(org)}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{label}</p>
                      {org?.plan && (
                        <p className="text-xs text-gray-500 capitalize">{org.plan} plan</p>
                      )}
                    </div>
                    {active && <div className="w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true" />}
                  </button>
                );
              })
            )}

            <hr className="my-2" />

            <button
              onClick={() => {
                setOpen(false);
                setShowCreate(true);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-3" />
              Create Organization
            </button>
          </div>
        )}
      </div>

      <CreateOrganizationModal open={showCreate} onClose={() => setShowCreate(false)} />
    </>
  );
};

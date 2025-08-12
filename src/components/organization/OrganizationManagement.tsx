import React, { useEffect, useState } from "react";
import { Building2, Plus, Loader2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Button } from "../ui/button";
import { useOrganization } from "../../contexts/OrganizationContext";
import CreateOrganizationModal from "../dashboard/CreateOrganizationModal";
import SkeletonTable from "../ui/SkeletonTable";
import { OrganizationAPI } from "../../services/organization";
import { showToast } from "../utils/showToast";

type OrgLike = {
  id?: string; Id?: string;
  name?: string; Name?: string;
  plan?: string; createdAt?: string;
  MFAMandatory?: boolean;
};

const getId = (o: OrgLike) => o?.id ?? o?.Id ?? "";
const getName = (o: OrgLike) => o?.name ?? o?.Name ?? "—";

// Minimal switch: green when enabled, no label text
const Switch: React.FC<{
  checked: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
  "aria-label"?: string;
}> = ({ checked, disabled, onChange, ...a11y }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        checked ? "bg-green-600" : "bg-gray-300"
      ].join(" ")}
      {...a11y}
    >
      <span
        className={[
          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-5" : "translate-x-1"
        ].join(" ")}
      />
    </button>
  );
};

export const OrganizationManagement: React.FC = () => {
  const { organizations, hydrating } = useOrganization();
  const [showCreate, setShowCreate] = useState(false);

  // MFA local state per org (value + loading)
  const [mfaState, setMfaState] = useState<Record<string, { value: boolean; loading: boolean }>>({});

  // Seed MFA state from the list once (if MFAMandatory is present)
  useEffect(() => {
    if (!organizations?.length) return;
    setMfaState((prev) => {
      const next = { ...prev };
      for (const o of organizations as OrgLike[]) {
        const id = getId(o);
        if (!id || next[id]) continue;
        next[id] = { value: typeof o.MFAMandatory === "boolean" ? o.MFAMandatory : false, loading: false };
      }
      return next;
    });
  }, [organizations]);

  const toggleMFA = async (orgId: string, nextVal: boolean) => {
    setMfaState((s) => ({ ...s, [orgId]: { value: nextVal, loading: true } }));
    try {
      const res = await OrganizationAPI.manageMFA(orgId, nextVal);
      const ok = (res as any)?.data?.success ?? (res as any)?.success ?? true;
      const confirmed = (res as any)?.data?.MFAMandatory ?? (res as any)?.MFAMandatory ?? nextVal;
      if (!ok) throw new Error("Request failed");
      setMfaState((s) => ({ ...s, [orgId]: { value: confirmed, loading: false } }));
      showToast(confirmed ? "MFA enabled." : "MFA disabled.","success");
    } catch (err: any) {
      setMfaState((s) => ({ ...s, [orgId]: { value: !nextVal, loading: false } }));
      showToast(err?.message || "Failed to update MFA.", "error");
    }
  };


  const items = (organizations ?? []).filter(Boolean) as OrgLike[];
  const showSkeleton = hydrating;

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Organization Management</h2>
            <p className="text-gray-600">View and manage organizations linked to your account</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Organization
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Organizations</h3>
          </CardHeader>
          <CardContent className="p-0">
            {showSkeleton ? (
              <SkeletonTable columns={["Organization", "Organization ID", "MFA", "Delete"]} rows={6} />
            ) : items.length === 0 ? (
              <div className="p-10 text-center text-gray-600">
                <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-gray-800 font-medium mb-1">No organizations yet</p>
                <p className="text-gray-500 mb-4">Click <b>Create Organization</b> to add your first one.</p>
                <Button onClick={() => setShowCreate(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Organization
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MFA</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((org) => {
                      const id = getId(org);
                      const name = getName(org);
                      const key = id || name;
                      const mfa = mfaState[id] ?? { value: org.MFAMandatory ?? false, loading: false };

                      return (
                        <tr key={key} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-gray-600" />
                              </div>
                              <span className="font-medium text-gray-900">{name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{id}</td>

                          {/* MFA toggle – green when enabled, no text labels */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <Switch
                                checked={!!mfa.value}
                                disabled={mfa.loading}
                                onChange={(val) => toggleMFA(id, val)}
                                aria-label={`Enable/Disable MFA for ${name}`}
                              />
                              {mfa.loading && <Loader2 className="w-4 h-4 animate-spin text-gray-500" />}
                            </div>
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

      <CreateOrganizationModal open={showCreate} onClose={() => setShowCreate(false)} />
    </>
  );
};

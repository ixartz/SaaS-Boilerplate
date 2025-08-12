import React, { useEffect, useRef, useState } from "react";
import { Building2, MoreVertical, Pencil, Trash, Plus } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Button } from "../ui/button";
import { useOrganization } from "../../contexts/OrganizationContext";
import { useNavigate } from "react-router-dom";
import CreateOrganizationModal from "../dashboard/CreateOrganizationModal";
import SkeletonTable from "../ui/SkeletonTable";

type OrgLike = { id?: string; Id?: string; name?: string; Name?: string; plan?: string; createdAt?: string };
const getId = (o: OrgLike) => o?.id ?? o?.Id ?? "";
const getName = (o: OrgLike) => o?.name ?? o?.Name ?? "—";

export const OrganizationManagement: React.FC = () => {
  const { organizations, hydrating } = useOrganization(); // ← use hydrating only
  const [showCreate, setShowCreate] = useState(false);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [menuFor, setMenuFor] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuFor(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Dummy actions (replace with real API later)
  const onEdit = (orgId: string) => {
    console.log("Edit org (dummy):", orgId);
    alert(`Edit organization ${orgId} (dummy)`);
    setMenuFor(null);
  };
  const onRemove = (orgId: string) => {
    console.log("Remove org (dummy):", orgId);
    alert(`Remove organization ${orgId} (dummy)`);
    setMenuFor(null);
  };

  const items = (organizations ?? []).filter(Boolean);
  const showSkeleton = hydrating; // skeleton on initial page load

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Organization Management</h2>
            <p className="text-gray-600">View and manage organizations linked to your account</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setOpen(false);
                setShowCreate(true);
              }}
            >
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
              <SkeletonTable columns={["Organization", "Organization ID", "Actions"]} rows={6} />
            ) : items.length === 0 ? (
              <div className="p-10 text-center text-gray-600">
                <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-gray-800 font-medium mb-1">No organizations yet</p>
                <p className="text-gray-500 mb-4">
                  Click <b>Create Organization</b> to add your first one.
                </p>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization ID
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((org) => {
                      const id = getId(org as OrgLike);
                      const name = getName(org as OrgLike);
                      const key = id || name;
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
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="relative inline-block" ref={menuRef}>
                              <button
                                className="p-2 rounded hover:bg-gray-100"
                                onClick={() => setMenuFor(menuFor === key ? null : key)}
                                aria-haspopup="menu"
                                aria-expanded={menuFor === key}
                              >
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                              </button>

                              {menuFor === key && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                  <button
                                    className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50"
                                    onClick={() => onEdit(key)}
                                  >
                                    <Pencil className="w-4 h-4 mr-2" /> Edit
                                  </button>
                                  <button
                                    className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 text-red-600"
                                    onClick={() => onRemove(key)}
                                  >
                                    <Trash className="w-4 h-4 mr-2" /> Remove
                                  </button>
                                </div>
                              )}
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

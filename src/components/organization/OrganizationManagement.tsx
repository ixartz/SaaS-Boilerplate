import React, { useEffect, useRef, useState } from "react";
import { Building2, MoreVertical, Pencil, Trash, RefreshCcw, Plus } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Button } from "../ui/button";
import { useOrganization } from "../../contexts/OrganizationContext";
import { useNavigate } from "react-router-dom";
import CreateOrganizationModal from "../dashboard/CreateOrganizationModal";

// Defensive helpers in case your cached data has different shapes
type OrgLike = { id?: string; Id?: string; name?: string; Name?: string; plan?: string; createdAt?: string };
const getId = (o: OrgLike) => o?.id ?? o?.Id ?? "";
const getName = (o: OrgLike) => o?.name ?? o?.Name ?? "—";

export const OrganizationManagement: React.FC = () => {
    const { organizations, loading, refresh } = useOrganization();
    const [showCreate, setShowCreate] = useState(false);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [menuFor, setMenuFor] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // ❌ Removed auto refresh on mount to avoid guard ↔ refresh ping-pong loops

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

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Organization Management</h2>
                        <p className="text-gray-600">View and manage organizations linked to your account</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => refresh()} disabled={loading}>
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                        <Button onClick={() => {
                            setOpen(false);
                            setShowCreate(true);
                        }}>
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
                        {loading ? (
                            <div className="p-6 text-gray-600">Loading organizations…</div>
                        ) : items.length === 0 ? (
                            <div className="p-6 text-gray-600">
                                No organizations found. Click <b>Refresh</b> or <b>Create Organization</b> to add one.
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {items.map((org) => {
                                    const id = getId(org as OrgLike);
                                    const name = getName(org as OrgLike);

                                    return (
                                        <li key={id || name} className="p-4 flex items-center">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-4">
                                                <Building2 className="w-5 h-5 text-gray-600" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">{name}</div>
                                                <div className="text-xs text-gray-500">{id}</div>
                                            </div>

                                            <div className="relative" ref={menuRef}>
                                                <button
                                                    className="p-2 rounded hover:bg-gray-100"
                                                    onClick={() => setMenuFor(menuFor === (id || name) ? null : (id || name))}
                                                    aria-haspopup="menu"
                                                    aria-expanded={menuFor === (id || name)}
                                                >
                                                    <MoreVertical className="w-4 h-4 text-gray-500" />
                                                </button>

                                                {menuFor === (id || name) && (
                                                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                        <button
                                                            className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50"
                                                            onClick={() => onEdit(id || name)}
                                                        >
                                                            <Pencil className="w-4 h-4 mr-2" /> Edit
                                                        </button>
                                                        <button
                                                            className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 text-red-600"
                                                            onClick={() => onRemove(id || name)}
                                                        >
                                                            <Trash className="w-4 h-4 mr-2" /> Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
            <CreateOrganizationModal open={showCreate} onClose={() => setShowCreate(false)} />
        </>

    );
};




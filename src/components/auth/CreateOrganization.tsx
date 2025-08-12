import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Globe } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Input } from "../ui/input";
import { useOrganization } from "../../contexts/OrganizationContext";

export const CreateOrganization: React.FC = () => {
  const navigate = useNavigate();
  const { createOrganization, loading } = useOrganization();

  const [name, setName] = useState("");
  const [domain, setDomain] = useState(""); // UI only (not sent if backend doesn’t accept it)
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter an organization name.");
      return;
    }

    try {
      // BACKEND expects only { name }. If/when your API supports domain, pass it there.
      await createOrganization({ name: trimmed ,domain});
      // createOrganization in the context already refreshes state → now we can go to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      const msg =
        err?.message ||
        err?.error ||
        "Failed to create organization. Please try again.";
      setError(msg);
      // Optional: console for dev visibility
      console.error("createOrganization error:", err);
    }
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setName(v);
    setDomain(
      v
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Your Organization</h2>
          <p className="text-gray-600 mt-2">Set up your workspace to get started</p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Organization Name"
                name="name"
                value={name}
                onChange={onNameChange}
                placeholder="Acme Corporation"
                required
                className="text-lg"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Organization Domain
                </label>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <Input
                    name="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value )}
                    placeholder="acme-corporation"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  This is your organization’s identifier (not sent to the server yet).
                </p>
              </div>
            </div>

            <div className="pt-4">
              {/* Use native button to guarantee submit behavior */}
              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="w-full py-3 text-lg font-semibold rounded bg-blue-600 text-white disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Organization"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                You can change these later in your organization settings.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

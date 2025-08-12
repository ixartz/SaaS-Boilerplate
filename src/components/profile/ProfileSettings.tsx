import React, { useEffect, useMemo, useState } from 'react';
import { Mail, Building2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useLRAuth } from '../../hooks/useLRAuth';
import { useOrganization } from '../../contexts/OrganizationContext';
import { lrProfileAPI } from '../../services/profile';
import { UserConfigAPI } from '../../services/userConfig';
import { showToast } from '../utils/showToast';

type LRProfile = {
  FirstName?: string | null;
  LastName?: string | null;
  UserName?: string | null;
  Email?: Array<{ Type?: string; Value?: string }>;
};

type UserConfig = {
  organizations: { Id: string; Name: string }[];
  tenantRoles?: { Id: string; Name: string }[]; // for reference
  userInfo?: { Email?: string; Uid?: string; RoleName?: string };
  currentRoleName?: string;
  viewerRoleName?: string;
};

export const ProfileSettings: React.FC = () => {
  const { user } = useLRAuth();
  const { viewerRoleName } = (useOrganization() as any) || {};

  const [profile, setProfile] = useState<LRProfile | null>(null);
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    userName: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const primaryEmail = useMemo(
    () => profile?.Email?.[0]?.Value ?? user?.email ?? '',
    [profile, user]
  );

  const roleName = useMemo(() => {
    return (
      userConfig?.userInfo?.RoleName ||
      userConfig?.currentRoleName ||
      userConfig?.viewerRoleName ||
      viewerRoleName
    );
  }, [userConfig, viewerRoleName, user]);

  const orgList = userConfig?.organizations ?? [];

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const [p, cfgRes] = await Promise.all([
          lrProfileAPI.getProfile(),
          UserConfigAPI.get().catch(() => null),
        ]);

        if (!alive) return;

        const prof: LRProfile = p || {};
        setProfile(prof);
        setForm({
          firstName: prof.FirstName ?? '',
          lastName: prof.LastName ?? '',
          userName: prof.UserName ?? '',
        });

        if (cfgRes) {
          const cfg = (cfgRes as any)?.data ?? cfgRes;
          setUserConfig(cfg as UserConfig);
        }
      } catch (err) {
        console.error(err);
        showToast('Failed to load profile information', 'error');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await lrProfileAPI.updateProfile({
        FirstName: form.firstName || null,
        LastName: form.lastName || null,
        UserName: form.userName || null,
      });
      const refreshed = await lrProfileAPI.getProfile();
      setProfile(refreshed);
      showToast('Profile updated successfully', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err?.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Full-page skeleton to avoid any blank page during initial load
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-7 w-56 bg-gray-200 rounded animate-pulse" />
          <div className="mt-2 h-4 w-80 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column skeleton (form) */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-white p-6 space-y-4">
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Right column skeleton (account overview) */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 space-y-4">
              <div className="h-5 w-44 bg-gray-200 rounded animate-pulse" />
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Real UI after data is loaded
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>

                <Input
                  label="Username"
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                />

                <Button type="submit" loading={saving} disabled={saving}>
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right: info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Account Overview</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500 break-all">
                      {primaryEmail || '—'}
                    </p>
                  </div>
                </div>

                {/* Organizations */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">Organizations</p>
                    {orgList.length === 0 ? (
                      <p className="text-sm text-gray-500">—</p>
                    ) : (
                      <ul className="mt-2 space-y-2">
                        {orgList.map(org => (
                          <li key={org.Id} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{org.Name}</span>
                            {/* If you later expose per-org role, render it here instead */}
                            <span className="text-xs text-gray-500 capitalize">
                              {roleName || '—'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

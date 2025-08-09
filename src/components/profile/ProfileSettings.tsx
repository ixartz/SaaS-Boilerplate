import React, { useState } from 'react';
import { User, Mail, Building2, Shield } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

export const ProfileSettings: React.FC = () => {
  const { user, currentOrganization } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    // Show success message
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-6">
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 1MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                />

                <Button type="submit" loading={loading}>
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Account Overview</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Organization</p>
                    <p className="text-sm text-gray-500">{currentOrganization?.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Role</p>
                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full">
                  Active Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
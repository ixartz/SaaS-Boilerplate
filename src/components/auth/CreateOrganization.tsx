import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, Upload } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useOrganization } from '../../contexts/OrganizationContext';

export const CreateOrganization: React.FC = () => {
  const navigate = useNavigate();
  const { createOrganization } = useOrganization();
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    logo: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await createOrganization(formData);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Failed to create organization. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate domain from name
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        domain: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }));
    }
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Organization Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                    value={formData.domain}
                    onChange={handleChange}
                    placeholder="acme-corporation"
                    required
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">.company.com</span>
                </div>
                <p className="text-xs text-gray-500">
                  This will be your organization's unique identifier
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Organization Logo (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    Upload Logo
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                loading={loading}
                className="w-full py-3 text-lg font-semibold"
              >
                Create Organization
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                You can always change these settings later in your organization dashboard.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
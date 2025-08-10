import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserPlus, Building2, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useLRAuth } from '../../hooks/useLRAuth';

interface InvitationData {
  organizationName: string;
  inviterName: string;
  role: string;
  email: string;
}

export const InvitationAccept: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, register } = useLRAuth();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const invitationToken = searchParams.get('invitation_token');

  useEffect(() => {
    if (invitationToken) {
      // Simulate fetching invitation data
      setInvitation({
        organizationName: 'Acme Corporation',
        inviterName: 'John Doe',
        role: 'member',
        email: 'sarah@company.com'
      });
    }
  }, [invitationToken]);

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isAuthenticated) {
        // Register new user
        await register({
          ...formData,
          email: invitation?.email
        });
      }
      
      // Simulate accepting invitation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAccepted(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Failed to accept invitation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid Invitation</h2>
            <p className="text-gray-600 mb-4">This invitation link is invalid or has expired.</p>
            <Button onClick={() => navigate('/')}>Go to Homepage</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the team!</h2>
            <p className="text-gray-600 mb-4">
              You've successfully joined {invitation.organizationName}. 
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">You're Invited!</h2>
          <p className="text-gray-600 mt-2">
            {invitation.inviterName} has invited you to join
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{invitation.organizationName}</h3>
                <p className="text-sm text-gray-600">as a {invitation.role}</p>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <form onSubmit={handleAccept} className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Complete your profile to accept the invitation:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={invitation.email}
                disabled
                className="bg-gray-50"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full py-3 text-lg font-semibold"
              >
                Accept Invitation & Join Team
              </Button>
            </form>
          )}

          {isAuthenticated && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                You're already signed in. Click below to accept the invitation.
              </p>
              <Button
                onClick={handleAccept}
                loading={loading}
                className="w-full py-3 text-lg font-semibold"
              >
                Accept Invitation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Organization, AuthContextType, RegisterData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@company.com',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face',
    role: 'admin'
  },
  {
    id: '2',
    email: 'sarah@company.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150&h=150&fit=crop&crop=face',
    role: 'member'
  }
];

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Acme Corp',
    slug: 'acme-corp',
    plan: 'pro',
    memberCount: 12,
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'TechStart Inc',
    slug: 'techstart-inc',
    plan: 'enterprise',
    memberCount: 25,
    createdAt: '2024-02-01T09:30:00Z'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('user');
    const storedOrgId = localStorage.getItem('currentOrganizationId');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setOrganizations(mockOrganizations);
      setIsAuthenticated(true);
      
      if (storedOrgId) {
        const org = mockOrganizations.find(o => o.id === storedOrgId);
        setCurrentOrganization(org || mockOrganizations[0]);
      } else {
        setCurrentOrganization(mockOrganizations[0]);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers.find(u => u.email === email);
    if (mockUser && password === 'password') {
      setUser(mockUser);
      setOrganizations(mockOrganizations);
      setCurrentOrganization(mockOrganizations[0]);
      setIsAuthenticated(true);
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('currentOrganizationId', mockOrganizations[0].id);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'admin'
    };

    const newOrganization: Organization = {
      id: Date.now().toString(),
      name: userData.organizationName,
      slug: userData.organizationName.toLowerCase().replace(/\s+/g, '-'),
      plan: 'free',
      memberCount: 1,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setOrganizations([newOrganization]);
    setCurrentOrganization(newOrganization);
    setIsAuthenticated(true);
    
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('currentOrganizationId', newOrganization.id);
  };

  const logout = () => {
    setUser(null);
    setOrganizations([]);
    setCurrentOrganization(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('currentOrganizationId');
  };

  const switchOrganization = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      localStorage.setItem('currentOrganizationId', orgId);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        organizations,
        currentOrganization,
        isAuthenticated,
        login,
        register,
        logout,
        switchOrganization
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
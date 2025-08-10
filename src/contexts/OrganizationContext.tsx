import React, { createContext, useContext, useEffect, useState } from 'react';
import { Organization } from '../types';

interface OrganizationContextType {
  organizations: Organization[];
  currentOrganization: Organization | null;
  hasOrganization: boolean;
  createOrganization: (orgData: CreateOrgData) => Promise<void>;
  switchOrganization: (orgId: string) => void;
  loading: boolean;
}

interface CreateOrgData {
  name: string;
  domain: string;
  logo?: string;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

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

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load organizations from localStorage or API
    const storedOrgs = localStorage.getItem('user_organizations');
    const storedCurrentOrg = localStorage.getItem('current_organization');
    
    if (storedOrgs) {
      const orgs = JSON.parse(storedOrgs);
      setOrganizations(orgs);
      
      if (storedCurrentOrg) {
        const currentOrg = orgs.find((org: Organization) => org.id === storedCurrentOrg);
        setCurrentOrganization(currentOrg || orgs[0]);
      } else if (orgs.length > 0) {
        setCurrentOrganization(orgs[0]);
      }
    }
    setLoading(false);
  }, []);

  const createOrganization = async (orgData: CreateOrgData): Promise<void> => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrg: Organization = {
      id: Date.now().toString(),
      name: orgData.name,
      slug: orgData.domain,
      plan: 'free',
      memberCount: 1,
      createdAt: new Date().toISOString()
    };

    const updatedOrgs = [...organizations, newOrg];
    setOrganizations(updatedOrgs);
    setCurrentOrganization(newOrg);
    
    localStorage.setItem('user_organizations', JSON.stringify(updatedOrgs));
    localStorage.setItem('current_organization', newOrg.id);
    setLoading(false);
  };

  const switchOrganization = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      localStorage.setItem('current_organization', orgId);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        currentOrganization,
        hasOrganization: organizations.length > 0,
        createOrganization,
        switchOrganization,
        loading
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
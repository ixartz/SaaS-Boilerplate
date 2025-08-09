export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  plan: 'free' | 'pro' | 'enterprise';
  memberCount: number;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  organizationId: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  invitedAt: string;
  joinedAt?: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  organizations: Organization[];
  currentOrganization: Organization | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  switchOrganization: (orgId: string) => void;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
}

export interface InvitationData {
  email: string;
  role: 'admin' | 'member' | 'viewer';
}
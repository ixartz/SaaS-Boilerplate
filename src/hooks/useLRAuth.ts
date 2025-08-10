// Mock LoginRadius authentication hook
// Replace this with actual LoginRadius SDK integration
import { useState, useEffect } from 'react';

interface LRUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface LRAuthHook {
  isAuthenticated: boolean;
  user: LRUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const useLRAuth = (): LRAuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LRUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('lr_user');
    const storedToken = localStorage.getItem('lr_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    // Simulate LoginRadius API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'john@company.com' && password === 'password') {
      const mockUser: LRUser = {
        id: '1',
        email: 'john@company.com',
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('lr_user', JSON.stringify(mockUser));
      localStorage.setItem('lr_token', 'mock_token_123');
    } else {
      throw new Error('Invalid credentials');
    }
    setLoading(false);
  };

  const register = async (userData: any): Promise<void> => {
    setLoading(true);
    // Simulate LoginRadius registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: LRUser = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('lr_user', JSON.stringify(newUser));
    localStorage.setItem('lr_token', 'mock_token_' + Date.now());
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('lr_user');
    localStorage.removeItem('lr_token');
    localStorage.removeItem('current_organization');
  };

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading
  };
};
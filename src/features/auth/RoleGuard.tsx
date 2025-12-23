'use client';

import { useAuth } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { ProtectFallback } from '@/features/auth/ProtectFallback';
import { ORG_ROLE } from '@/types/Auth';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export const RoleGuard = ({ 
  children, 
  requiredRole = ORG_ROLE.ADMIN,
  fallback 
}: RoleGuardProps) => {
  const { has } = useAuth();
  const t = useTranslations('RoleGuard');

  const hasRequiredRole = has({ role: requiredRole });

  if (!hasRequiredRole) {
    return fallback || (
      <ProtectFallback
        title={t('access_denied')}
        description={t('insufficient_permissions')}
      />
    );
  }

  return <>{children}</>;
};

'use client';

import { OrganizationSwitcher, Show } from '@clerk/nextjs';
import { useLocale } from 'next-intl';
import { getI18nPath } from '@/utils/Helpers';

export const OrganizationMenu = () => {
  const locale = useLocale();

  // Only render OrganizationSwitcher for signed-in users to avoid Clerk's active session warning.
  // To avoid warning, 'use client' is also required.
  return (
    <Show when="signed-in">
      <OrganizationSwitcher
        organizationProfileMode="navigation"
        organizationProfileUrl={getI18nPath(
          '/dashboard/organization-profile',
          locale,
        )}
        afterCreateOrganizationUrl="/dashboard"
        hidePersonal
        skipInvitationScreen
        appearance={{
          elements: {
            organizationSwitcherTrigger: 'max-w-28 sm:max-w-52',
          },
        }}
      />
    </Show>
  );
};

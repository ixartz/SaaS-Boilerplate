'use client';

import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';
import { MessageState } from '@/features/dashboard/MessageState';

const AdminOrganizationsPage = () => {
  const t = useTranslations('AdminOrganizations');

  return (
    <>
      <TitleBar
        title={t('title')}
        description={t('description')}
      />

      <MessageState
        icon={(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M17 20H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z" />
            <path d="M12 4v16" />
          </svg>
        )}
        title={t('organizations_title')}
        description={t('organizations_description')}
      />
    </>
  );
};

export default AdminOrganizationsPage;

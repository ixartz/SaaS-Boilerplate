'use client';

import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';
import { MessageState } from '@/features/dashboard/MessageState';

const AdminUsersPage = () => {
  const t = useTranslations('AdminUsers');

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
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
        title={t('users_title')}
        description={t('users_description')}
      />
    </>
  );
};

export default AdminUsersPage;

import { useTranslations } from 'next-intl';

import { MessageState } from '@/features/dashboard/MessageState';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { SponsorLogos } from '@/features/sponsors/SponsorLogos';

const DashboardIndexPage = () => {
  const t = useTranslations('DashboardIndex');

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
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
            <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3M12 12l8-4.5M12 12v9M12 12L4 7.5" />
          </svg>
        )}
        title={t('message_state_title')}
        description={t.rich('message_state_description', {
          code: chunks => (
            <code className="bg-secondary text-secondary-foreground">
              {chunks}
            </code>
          ),
        })}
        button={(
          <>
            <div className="mt-2 whitespace-pre text-sm font-light text-muted-foreground">
              {t.rich('message_state_alternative', {
                url: () => (
                  <a
                    className="text-blue-500 hover:text-blue-600"
                    href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
                  >
                    Next.js Boilerplate SaaS
                  </a>
                ),
              })}

              <p>
                {t.rich('max_message', {
                  url: () => (
                    <a
                      className="text-blue-500 hover:text-blue-600"
                      href="https://nextjs-boilerplate.com/nextjs-multi-tenant-saas-boilerplate"
                    >
                      Next.js Boilerplate Max
                    </a>
                  ),
                })}
              </p>
            </div>

            <div className="mt-7">
              <SponsorLogos />
            </div>
          </>
        )}
      />
    </>
  );
};

export default DashboardIndexPage;

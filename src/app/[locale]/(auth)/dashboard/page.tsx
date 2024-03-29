import { Protect } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { ProtectFallback } from '@/features/auth/ProtectFallback';
import { MessageState } from '@/features/dashboard/MessageState';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { ORG_ROLE } from '@/types/Auth';

const DashboardIndexPage = () => {
  const t = useTranslations('DashboardIndex');

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <MessageState
        icon={
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
        }
        title={t('message_state_title')}
        description={t.rich('message_state_description', {
          code: (chunks) => (
            <code className="bg-secondary text-secondary-foreground">
              {chunks}
            </code>
          ),
        })}
        button={
          <Protect
            role={ORG_ROLE.ADMIN}
            fallback={
              <ProtectFallback
                trigger={
                  <div
                    className={buttonVariants({
                      size: 'lg',
                      variant: 'secondary',
                    })}
                  >
                    {t('message_state_button')}
                  </div>
                }
              />
            }
          >
            <a
              className={buttonVariants({ size: 'lg' })}
              href="https://github.com/ixartz/SaaS-Boilerplate"
            >
              {t('message_state_button')}
            </a>
          </Protect>
        }
      />
    </>
  );
};

export default DashboardIndexPage;

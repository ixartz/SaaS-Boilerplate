import { HeaderTabs } from '../organisms';
import { FooterSocial } from '../organisms/FooterSocial/FooterSocial';
import classes from './PortfolioLayout.module.scss';

export const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.header}>
        <HeaderTabs />
      </div>
      <div className={classes.content}>
        {children}
      </div>
      <div className={classes.footer}>
        <FooterSocial />
      </div>
    </div>
  );
};

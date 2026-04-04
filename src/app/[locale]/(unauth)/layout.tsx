import { PortfolioLayout } from '@/components/layouts/PortfolioLayout';

const UnauthLayout = ({ children }: { children: React.ReactNode }) => {
  return <PortfolioLayout>{children}</PortfolioLayout>;
};

export default UnauthLayout;

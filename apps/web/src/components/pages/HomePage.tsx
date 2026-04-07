import { ChatBot, ContactInfo, ExperienceSection, HeroBullets, PortfolioHeroSection, SkillsSection } from '../organisms/';

export const HomePage = () => {
  return (
    <>
      <HeroBullets />
      <ChatBot />
      <PortfolioHeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactInfo />
    </>
  );
};

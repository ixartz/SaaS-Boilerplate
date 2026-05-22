import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CTA } from '@/templates/CTA';
import { DemoBanner } from '@/templates/DemoBanner';
import { FAQ } from '@/templates/FAQ';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';
import { Pricing } from '@/templates/Pricing';
import { Sponsors } from '@/templates/Sponsors';

type IndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IndexProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <DemoBanner />
      <Navbar />
      <Hero />
      <Sponsors />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

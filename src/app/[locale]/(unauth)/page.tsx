import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { CTA } from '@/templates/CTA';
import { DemoBanner } from '@/templates/DemoBanner';
import { FAQ } from '@/templates/FAQ';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';
import { Pricing } from '@/templates/Pricing';
import { Sponsors } from '@/templates/Sponsors';
import { AppConfig } from '@/utils/AppConfig';

export async function generateMetadata(props: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  const title = t('meta_title');
  const description = t('meta_description');

  return {
    title,
    description,
    metadataBase: AppConfig.demoUrl ? new URL(AppConfig.demoUrl) : undefined,
    openGraph: {
      title,
      description,
      url: AppConfig.demoUrl,
      siteName: AppConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@strixgov',
    },
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <DemoBanner />
      <Navbar />
      <Hero />
      <Sponsors />
      <section id="features">
        <Features />
      </section>
      <Pricing />
      <FAQ />
      <section id="cta">
        <CTA />
      </section>
      <Footer />
    </>
  );
};

export default IndexPage;

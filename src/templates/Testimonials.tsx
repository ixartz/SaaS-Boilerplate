import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Section } from '@/features/landing/Section';

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Marketing Manager',
    text: 'PostUp made it effortless to turn discussions into engaging posts.',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Content Creator',
    text: 'The automation saved us hours each week.',
    rating: 5,
  },
  {
    name: 'Liam Smith',
    role: 'Blogger',
    text: 'Our blog traffic has doubled since using PostUp.',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    role: 'Community Lead',
    text: 'An essential tool for staying ahead of trends.',
    rating: 4,
  },
];

export const Testimonials = () => {
  const t = useTranslations('Testimonials');
  return (
    <Section subtitle={t('section_subtitle')} title={t('section_title')}>
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
        {testimonials.map(item => (
          <div
            key={item.name}
            className="min-w-[300px] shrink-0 snap-center rounded-lg border p-6 shadow-sm"
          >
            <div className="mb-2 flex text-yellow-500">
              {Array.from({ length: item.rating }).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Star key={i} className="size-4 fill-yellow-500" />
              ))}
            </div>
            <p className="mb-4 text-sm text-muted-foreground">{item.text}</p>
            <div className="font-semibold">{item.name}</div>
            <div className="text-xs text-muted-foreground">{item.role}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

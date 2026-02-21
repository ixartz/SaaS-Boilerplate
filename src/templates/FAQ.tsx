import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/features/landing/Section';

export const FAQ = () => {
  return (
    <Section>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is this template free?</AccordionTrigger>
          <AccordionContent>Yes, it is completely free and open source.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I use it for commercial projects?</AccordionTrigger>
          <AccordionContent>Yes, you can use it for both personal and commercial projects.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you offer support?</AccordionTrigger>
          <AccordionContent>Community support is available via GitHub issues.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
};

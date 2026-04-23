import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/features/landing/Section';

const FAQS = [
  {
    q: 'How is this different from a system prompt that says "be careful"?',
    a: 'System prompts are suggestions. Strix is runtime enforcement. When an agent tries a destructive action, a prompt might advise against it — Strix blocks the tool call before it reaches your APIs, writes a receipt, and escalates. The difference: one relies on the model cooperating, the other doesn\'t.',
  },
  {
    q: 'Where does Strix run?',
    a: 'Strix is a library you embed in your agent runtime. Policies and capabilities live in your repo. The governance decision happens locally in the same process as your tool dispatch — no extra network hop. Receipts can be streamed to your log pipeline.',
  },
  {
    q: 'What does the SDK look like?',
    a: 'Wrap a tool call in `governed()`: you declare the capability id, the principal, and the estimated impact. Strix returns allow / approval_required / block plus a receipt. If allow, run the call. If not, handle the intercept. Typical integration: under 20 lines.',
  },
  {
    q: 'Does it work with my agent framework?',
    a: 'Yes. Strix is framework-agnostic. We have reference integrations for OpenAI Assistants, Anthropic tool use, LangChain, LlamaIndex, and plain function-calling. If your agent calls functions, Strix can govern them.',
  },
  {
    q: 'Are the receipts actually cryptographic?',
    a: 'Each receipt is hash-chained to the previous one (FNV in the demo for zero-dep browser execution; production uses BLAKE3 or SHA-256). Tampering with one receipt invalidates the chain. You can anchor periodic digests to your transparency log of choice.',
  },
  {
    q: 'How does pricing work?',
    a: 'The demo and developer tier are free forever. Production plans are usage-based on governed-call volume, with a fixed platform fee for audit retention and support. Contact us for enterprise terms.',
  },
];

export const FAQ = () => (
  <Section
    title="Common questions"
    subtitle="FAQ"
    description="Short answers to the questions developers ask in the first five minutes."
  >
    <Accordion type="multiple" className="w-full">
      {FAQS.map((item, i) => (
        <AccordionItem value={`item-${i}`} key={item.q}>
          <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </Section>
);

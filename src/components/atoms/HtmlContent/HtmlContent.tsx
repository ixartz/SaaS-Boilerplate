import DOMPurify from 'isomorphic-dompurify';
import { useMemo } from 'react';

type HtmlContentProps = {
  content: string;
  className?: string;
};

// Configure DOMPurify to allow safe HTML tags
const sanitizeConfig = {
  ALLOWED_TAGS: [
    'strong',
    'b',
    'em',
    'i',
    'u',
    's',
    'br',
    'p',
    'span',
    'a',
    'ul',
    'ol',
    'li',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'code',
    'pre',
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
};

export function HtmlContent({ content, className }: HtmlContentProps) {
  const sanitizedHtml = useMemo(() => {
    if (!content) {
      return '';
    }

    return DOMPurify.sanitize(content, sanitizeConfig);
  }, [content]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

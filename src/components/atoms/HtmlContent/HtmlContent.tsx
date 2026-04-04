import type { DOMNode } from 'html-react-parser';
import parse, { domToReact, Element, Text } from 'html-react-parser';
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

export function HtmlContent({ content, className: _className }: HtmlContentProps) {
  const parsedContent = useMemo(() => {
    if (!content) {
      return null;
    }

    const sanitizedHtml = DOMPurify.sanitize(content, sanitizeConfig);

    return parse(sanitizedHtml, {
      replace: (domNode) => {
        if (domNode instanceof Element && domNode.attribs) {
          const { attribs, children } = domNode;

          // Convert class attribute to className
          if (attribs.class) {
            attribs.className = attribs.class;
            delete attribs.class;
          }

          return domToReact(children as DOMNode[]);
        }

        if (domNode instanceof Text) {
          return domNode.data;
        }

        return undefined;
      },
    });
  }, [content]);

  return <>{parsedContent}</>;
}

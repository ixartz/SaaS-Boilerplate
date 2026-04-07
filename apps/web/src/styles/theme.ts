'use client';
import type { MantineColorsTuple } from '@mantine/core';
import { createTheme, rem } from '@mantine/core';

const indigo: MantineColorsTuple = [
  '#eef2ff',
  '#e0e7ff',
  '#c7d2fe',
  '#a5b4fc',
  '#818cf8',
  '#6366f1',
  '#4f46e5',
  '#4338ca',
  '#3730a3',
  '#312e81',
];

export const theme = createTheme({
  primaryColor: 'indigo',
  colors: { indigo },

  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',

  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '800',
    sizes: {
      h1: { fontSize: rem(48), lineHeight: '1.1' },
      h2: { fontSize: rem(36), lineHeight: '1.2' },
    },
  },

  components: {
    Container: {
      defaultProps: { size: 'lg', px: 'md' },
    },

    Card: {
      defaultProps: { radius: 'lg', withBorder: true },
      styles: (_theme: Record<string, any>) => ({
        root: {
          'transition': 'transform 200ms ease, box-shadow 200ms ease',
          'backgroundColor': 'var(--mantine-color-body)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 'var(--mantine-shadow-md)',
            borderColor: 'var(--mantine-color-indigo-light-hover)',
          },
        },
      }),
    },

    Timeline: {
      styles: {
        itemTitle: { fontWeight: 700, fontSize: rem(18) },
        itemBullet: { borderWidth: rem(2) },
      },
    },

    Badge: {
      defaultProps: { variant: 'light', radius: 'sm' },
      styles: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          // padding: `${rem(4)} ${rem(8)}`,
        },
      },
    },

    Button: {
      defaultProps: { radius: 'md', fw: 600 },
      vars: (_theme: Record<string, any>, props: Record<string, any>) => {
        if (props.variant === 'filled') {
          return { root: { '--button-bg': 'var(--mantine-color-indigo-filled)' } };
        }
        return { root: {} };
      },
    },

    Title: {
      styles: {
        root: { letterSpacing: '-0.02em' },
      },
    },

    Carousel: {
      styles: {
        control: {
          'backgroundColor': 'var(--mantine-color-body)',
          'opacity': 0.8,
          '&:hover': { opacity: 1 },
        },
        indicator: {
          'width': rem(12),
          'transition': 'width 250ms ease',
          '&[data-active]': { width: rem(40) },
        },
      },
    },
  },
});

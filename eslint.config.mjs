import antfu from '@antfu/eslint-config';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import playwright from 'eslint-plugin-playwright';
import storybook from 'eslint-plugin-storybook';

export default antfu(
  {
    react: true,
    nextjs: true,
    typescript: true,

    // Configuration preferences
    lessOpinionated: true,
    isInEditor: false,

    // Code style
    stylistic: {
      semi: true,
    },

    // Format settings
    formatters: {
      /**
       * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
       * By default uses Prettier
       */
      css: true,
    },

    // Ignored paths
    ignores: [
      '.alchemy/**/*',
      'migrations/**/*',
    ],
  },
  // --- Tailwind CSS Rules ---
  eslintPluginBetterTailwindcss.configs.recommended,
  {
    settings: {
      'better-tailwindcss': {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: 'src/styles/global.css',
      },
    },
  },
  // --- E2E Testing Rules ---
  {
    files: [
      '**/*.integ.ts',
      '**/*.e2e.ts',
    ],
    ...playwright.configs['flat/recommended'],
  },
  // --- Storybook Rules ---
  ...storybook.configs['flat/recommended'],
  // --- Custom Rule Overrides ---
  {
    rules: {
      'antfu/no-top-level-await': 'off', // Allow top-level await
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
      'react/purity': 'off', // Allow intentional impure render logic when needed
      'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'react-hooks/incompatible-library': 'off', // Disable warning for compilation skipped
      'react-hooks/exhaustive-deps': 'off', // Disable exhaustive-deps in useEffect
      'node/prefer-global/process': 'off', // Allow using `process.env`
      'test/padding-around-all': 'error', // Add padding in test files
      'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles
      'jsdoc/require-jsdoc': 'off', // JSDoc comments are optional
      'jsdoc/require-returns': 'off', // Return types are optional
    },
  },
);

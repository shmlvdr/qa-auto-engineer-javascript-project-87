import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser, 
      },
    },
    plugins: {
      js,
    },
    rules: {
    },
  },
];
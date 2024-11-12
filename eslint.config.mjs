import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { 
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      "@typescript-eslint/no-explicit-any": "ignores",
    }
  },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
];

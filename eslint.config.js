import playwright from 'eslint-plugin-playwright';

export default [
  playwright.configs['flat/recommended'],
  {
    rules: {
        "@typescript-eslint/no-misused-promises": "error",
        "playwright/missing-playwright-await": "error"
    },
  },
];
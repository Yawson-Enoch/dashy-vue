// @ts-check

/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  semi: true,

  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],

  importOrderParserPlugins: ['typescript'],
  importOrder: ['^(vue$)', '<THIRD_PARTY_MODULES>', '', '^@/(.*)$', '', '^[.]'],
};

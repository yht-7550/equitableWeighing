/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'function-url-quotes': 'always',
    'color-hex-length': 'long',
    'rule-empty-line-before': 'never',
    'font-family-no-missing-generic-family-keyword': null,
    'scss/at-import-partial-extension': null,
    'property-no-unknown': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'value-no-vendor-prefix': null,
    'no-descending-specificity': null,
    'value-keyword-case': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
  },
  fix: true,
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}

const { ESLint } = require('eslint');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 2021, sourceType: 'module' },
    plugins: {
      node: require('eslint-plugin-node'),
      prettier: require('eslint-plugin-prettier')
    },
    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: false
        }
      ],
      'no-console': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          useTabs: false,
          tabWidth: 2,
          trailingComma: 'none',
          printWidth: 80,
          arrowParens: 'avoid'
        }
      ]
    }
  }
];

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
  ],
  rules: {
    complexity: ['error', 12],
    'no-template-curly-in-string': 'warn',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            fixStyle: 'inline-type-imports',
          },
        ],
      },
    },
    {
      files: ['.eslintrc.js', '*.config.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: '*.vue',
      rules: require('@typescript-eslint/eslint-plugin').configs['eslint-recommended'].overrides[0].rules,
    },
    {
      files: require('./tsconfig.json').include.filter((path) => !path.includes('..')),
      excludedFiles: '*.vue',
      extends: 'plugin:@typescript-eslint/recommended-requiring-type-checking',
      parserOptions: {
        project: './**/tsconfig.json',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        '@typescript-eslint/no-parameter-properties': [
          'error',
          {
            allows: ['private', 'protected', 'public', 'private readonly', 'protected readonly', 'public readonly'],
          },
        ],
        '@typescript-eslint/require-await': 'off',
      },
    },
    {
      files: './{src}/**',
      rules: {
        'no-console': 'warn',
      },
    },
  ],
  plugins: ['pug'],
  ignorePatterns: ['src/__generated__/*'],
}

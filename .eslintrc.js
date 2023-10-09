module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: [
    'eslint-plugin-import',
    'eslint-plugin-prefer-arrow',
    '@typescript-eslint',
    'no-relative-import-paths',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': 0,
    'no-duplicate-imports': 'off',
    'prettier/prettier': 0,
    camelcase: 0,
    'max-len': [
      1,
      {
        code: 120,
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': [
      2,
      {
        allowSameFolder: true,
        rootDir: 'src',
        prefix: '~',
      },
    ],
    'no-use-before-define': 0,
    'default-param-last': 0,
    'multiline-ternary': 0,
    'key-spacing': ['error'],
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

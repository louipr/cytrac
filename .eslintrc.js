module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Basic TypeScript rules  
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    
    // Import rules for TypeScript
    'import/extensions': ['error', 'ignorePackages', {
      'ts': 'never',
      'tsx': 'never'
    }],
    
    // Adjust some airbnb rules for our use case
    'no-console': 'warn',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { 'code': 120 }],
    
    // Allow for-of loops (common in Node.js)
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      env: {
        jest: true,
      },
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};

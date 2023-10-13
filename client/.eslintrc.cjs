module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-no-useless-fragment': 0,
    'react/react-in-jsx-scope': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    // 'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  }
};

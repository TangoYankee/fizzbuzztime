module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.13.1'
    }
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'no-unused-vars': 'off'
  }
}

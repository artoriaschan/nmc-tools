module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
    // most of the codebase are expected to be env agnostic
    'no-restricted-globals': ['error'],
    'no-restricted-syntax': [
      'error',
      'ObjectPattern > RestElement',
      'AwaitExpression'
    ]
  },
  overrides: [
    {
      files: ['scripts/*.js'],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off'
      }
    }
  ]
}

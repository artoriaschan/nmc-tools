const Configuration = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'perf',
        'refactor',
        'test',
        'workflow',
        'build',
        'ci',
        'chore',
        'types',
        'test',
        'revert',
        'build'
      ]
    ]
  }
}

module.exports = Configuration

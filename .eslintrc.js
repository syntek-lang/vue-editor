module.exports = {
  root: true,
  extends: '@syntek/syntek/vue',
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // TODO: Move this rule to @syntek/eslint-config-syntek
    'vue/match-component-file-name': ['error', {
      extensions: ['vue'],
      shouldMatchCase: true,
    }],
  },
};

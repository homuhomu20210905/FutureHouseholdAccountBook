module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
  ],
  plugins: ['vue'],
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'no-unused-vars': 'off', // 使っていない変数を許可
    'vue/html-self-closing': 'off', // 空タグを許可する
    'prettier/prettier': ['error', { semi: false }],
  },
}

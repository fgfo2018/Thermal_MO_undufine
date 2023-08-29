module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    jquery: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    'standard',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: ['vue'],
  // add your custom rules here
  // 加了no-var
  rules: {
    'no-var': 0,
    "no-console": "off",
    'GPU': "off",
    // "no-undef":0
  },
  globals: {
    $: 'readonly',
    moment: 'readonly',
  },
}

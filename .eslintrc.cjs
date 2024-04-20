module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
  },
  plugins: ['react', 'react-hooks', 'import'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:import/react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    'linebreak-style': 0,
    'react/tsx-indent': ['error', 2],
    'react/require-default-props': 'off',
    'react/tsx-indent-props': ['warn', 'first'],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'react/tsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
    'react/tsx-max-props-per-line': [
      'warn',
      {
        maximum: {
          single: 4,
          multi: 2,
        },
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/tsx-wrap-multilines': 'off',
    'react/no-danger': 'off',
    'react/tsx-props-no-spreading': 'off',
    'react/self-closing-comp': 'warn',
    'react/button-has-type': 'off',
    'react/function-component-definition': 'off',
    quotes: [2, 'single'],
  },
  overrides: [
    {
      env: {
        es6: true,
        browser: true,
        node: true,
      },
      files: ['.eslintrc.{ts,cts}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx'],
      },
      alias: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
}

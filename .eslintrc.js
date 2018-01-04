module.exports = {
  extends: ["airbnb-base", "airbnb/rules/react", "prettier"],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["prettier"],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  globals: {
    videojs: true
  },
  rules: {
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
        mjs: "never",
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "react/jsx-filename-extension": "off",
    "react/prefer-stateless-function": "off",

    // Custom rules
    "linebreak-style": ["error", "unix"],
    "no-trailing-spaces": ["error", { skipBlankLines: false }],
    "no-underscore-dangle": "off",
    "react/jsx-uses-vars": [2],
  },
  parser: "babel-eslint",
};

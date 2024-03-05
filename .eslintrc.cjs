module.exports = {
  root: true,
  env: { browser: true, es2024: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','tailwind.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  settings: {
    cache:false,
    react: {
      version: "detect",
    },
  },
  plugins: ["react","react-hooks","unused-imports",'react-refresh'],
  rules: {
    "@typescript-eslint/no-unused-vars":"warn",
    "no-unused-vars":"warn",
    "unused-imports/no-unused-imports":"warn",
    "unused-imports/no-unused-imports-ts": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/no-unknown-property":"warn",
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unreachable-loop": "error",
    "no-void": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-key": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message: "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message: "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
  },
}

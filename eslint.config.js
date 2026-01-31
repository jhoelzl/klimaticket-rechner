const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["**/node_modules/**", ".githooks/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "off",
      "no-console": "off",
      "eqeqeq": ["error", "always"],
      "curly": "off",
      "no-var": "error",
      "prefer-const": "off"
    }
  }
];

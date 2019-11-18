module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "@vue/prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { trailingComma: "es5" }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-prototype-builtins": "off",
    "no-useless-escape": "off",
    "vue/no-use-v-if-with-v-for": "off",
    "vue/no-side-effects-in-computed-properties": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};

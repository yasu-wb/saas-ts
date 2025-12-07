import baseConfig from "./eslint-base.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,

  // ブラウザ/React環境用の設定
  {
    rules: {
      // React向けルール
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

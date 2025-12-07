import baseConfig from "./eslint-base.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,

  // Node.js環境用の設定
  {
    rules: {
      // Node.js向けルール
      "no-console": "off", // サーバーサイドではconsole許可
    },
  },
];

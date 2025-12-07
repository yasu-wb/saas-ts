/** @type {import('prettier').Config} */
export default {
  // 基本設定
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",

  // 末尾カンマ（ES5互換）
  trailingComma: "es5",

  // ブラケット
  bracketSpacing: true,
  bracketSameLine: false,

  // アロー関数の括弧
  arrowParens: "always",

  // 改行コード
  endOfLine: "lf",

  // JSX
  jsxSingleQuote: false,

  // プロパティ
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: false,
};

module.exports = {
  extends: ["next/core-web-vitals", "smarthr"],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/react-in-jsx-scope": "off",
    // eslint-plugin-tailwindcssを入れたらエラーになったので一旦落としています
    "smarthr/a11y-clickable-element-has-text": "off",
    // Next.jsのファイルベースルーティングを理解できていないので落とします
    "smarthr/r": "off",
  },
}

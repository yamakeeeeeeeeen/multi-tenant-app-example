module.exports = {
  extends: ['next/core-web-vitals', 'smarthr'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/react-in-jsx-scope': 'off',
    // eslint-plugin-tailwindcssを入れたらエラーになったので一旦落としています
    'smarthr/a11y-clickable-element-has-text': 'off',
    // Next.jsのファイルベースルーティングを理解できていないので落とします
    'smarthr/require-barrel-import': 'off',

    'smarthr/a11y-heading-in-sectioning-content': 'off',
    'smarthr/a11y-input-has-name-attribute': 'off',
    'smarthr/a11y-delegate-element-has-role-presentation': 'off',
    'smarthr/best-practice-for-date': 'off',

    'no-return-await': 'off',
  },
}

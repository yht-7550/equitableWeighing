// @see: https://stylelint.io

/** @type {import('stylelint').Config} */
module.exports = {
  root: true,
  // 继承某些已有的规则
  extends: [
    'stylelint-config-standard', // 配置 stylelint 拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置 stylelint scss 插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置 stylelint css 属性书写顺序插件,
  ],
  overrides: [
    // 扫描 .vue/html 文件中的 <style> 标签内的样式
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'function-url-quotes': 'always', // URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'color-hex-length': 'long', // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    'rule-empty-line-before': 'never', // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行)"
    'font-family-no-missing-generic-family-keyword': null, // 禁止在字体族名称列表中缺少通用字体族关键字
    'scss/at-import-partial-extension': null, // 解决不能使用 @import 引入 scss 文件
    'property-no-unknown': null, // 禁止未知的属性
    'no-empty-source': null, // 禁止空源码
    'block-no-empty': null, // 禁止空块
    'selector-class-pattern': null, // 强制选择器类名的格式
    'value-no-vendor-prefix': null, // 关闭 vendor-prefix (为了解决多行省略 -webkit-box)
    'no-descending-specificity': null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器
    'value-keyword-case': null, // 解决在 scss 中使用 v-bind 大写单词报错
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
    'comment-whitespace-inside': 'always', //  /* comment */ 注释内部前后使用空格
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-semicolon-newline-before': 'never-multi-line', // 禁止在分号前有空行
    'indentation': 2,
    'no-extra-semicolons': true, // 禁止多个分号
    'declaration-block-trailing-semicolon': ['always', { ignore: ['single-declaration'] }], // 尾随分号(单个可以不使用)
    'declaration-block-semicolon-space-after': 'always-single-line', // 分号后必须有空格
    'declaration-block-semicolon-newline-after': 'always-multi-line', // 多行分号后必须有换行
    'declaration-colon-space-after': 'always', // 冒号后必须有空格
    'declaration-colon-space-before': 'never', // 冒号前不允许有空格
    'color-function-notation': 'legacy', // 如 rgba(255, 255, 255, 0.5) 必须有逗号
    'alpha-value-notation': 'number', // 如 rgba(255, 255, 255, 0.5) 透明度必须是数字
    'declaration-block-single-line-max-declarations': 1,
    'block-opening-brace-newline-after': 'always-multi-line', // .a {  多行块后必须有换行
    'block-opening-brace-space-before': 'always', // { 前必须有空格
    'block-closing-brace-newline-before': 'always-multi-line', // } 多行前必须有换行
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}

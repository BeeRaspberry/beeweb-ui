module.exports = {
    /**
     * See packages/eslint-plugin/src/configs/README.md
     * for what this recommended config contains.
     */
    ignorePatterns: ['**/*.js'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      // ORIGINAL tslint.json -> "directive-selector": [true, "attribute", "app", "camelCase"],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'hc', style: 'camelCase' },
      ],
  
      // ORIGINAL tslint.json -> "component-selector": [true, "element", "app", "kebab-case"],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'hc', style: 'kebab-case' },
      ],
    },
    overrides: [
      // Add this rules, if you use inline templates inside *.component.ts files
      {
        files: ['*.component.ts'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
        },
        plugins: ['@angular-eslint/template'],
        processor: '@angular-eslint/template/extract-inline-html',
      },
    ],
  };
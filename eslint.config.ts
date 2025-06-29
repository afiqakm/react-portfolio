import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser
            },
            parserOptions: {
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'import': importPlugin,
            'react': reactPlugin
        },
        rules: {
            // React Hooks rules
            ...reactHooks.configs.recommended.rules,

            // React Refresh
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ],

            // Semicolon enforcement
            'semi': ['error', 'always'],

            // Unused variable warning
            '@typescript-eslint/no-unused-vars': ['warn'],

            // Quotes
            'quotes': ['error', 'single', { avoidEscape: true }],
            'jsx-quotes': ['error', 'prefer-single'], // 🔥 Enforces single quotes in JSX

            // Indentation
            'indent': ['error', 4, { 'SwitchCase': 1 }],

            // Import sorting
            'import/order': ['error', {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index'
                ],
                'newlines-between': 'always'
            }],

            // Ignore useEffect dependencies (use with caution)
            'react-hooks/exhaustive-deps': 'off',

            // Trailing spaces
            'no-trailing-spaces': 'error',
        }
    }
);
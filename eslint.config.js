import beadsPlugin from './eslint-plugin-beads/index.js';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      beads: beadsPlugin,
    },
    rules: {
      // Beads enforcement rules
      'beads/require-beads-reference': 'error',
      'beads/no-untracked-complexity': ['warn', { maxComplexity: 15 }],
    },
  },
  {
    // Ignore patterns
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.astro/**',
      '.beads/**',
      'eslint-plugin-beads/**',
    ],
  },
];

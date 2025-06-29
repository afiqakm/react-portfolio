import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~components': path.resolve(__dirname, 'src/components'),
            '~assets': path.resolve(__dirname, 'src/assets'),
            '~containers': path.resolve(__dirname, 'src/containers'),
            '~types': path.resolve(__dirname, 'src/types'),
            '~config': path.resolve(__dirname, 'src/config'),
            '~apis': path.resolve(__dirname, 'src/apis'),
            '~hooks': path.resolve(__dirname, 'src/hooks'),
            '~utils': path.resolve(__dirname, 'src/utils'),
            '~contexts': path.resolve(__dirname, 'src/contexts'),
            '~store': path.resolve(__dirname, 'src/store'),
            '~navigation': path.resolve(__dirname, 'src/navigation'),
            '~dummy': path.resolve(__dirname, 'src/dummy'),
        }
    },
    plugins: [
        react(),
        tailwindcss(),
    ],
});

import { defineConfig } from 'vite';
import path from 'node:path';
import eslint from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(() => {
  return {
    server: {
      port: 1234,
    },
    appType: 'mpa',
    publicDir: path.resolve(__dirname, 'public'),
    root: path.resolve(__dirname, 'src'),
    // base: '/bstones/',
    build: {
      outDir: '../dist',
      assetsInlineLimit: 0,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.html'),
          about: path.resolve(__dirname, 'src/about/index.html'),
          portfolio: path.resolve(__dirname, 'src/portfolio/index.html'),
          detail: path.resolve(__dirname, 'src/portfolio/detail/index.html'),
          recruit: path.resolve(__dirname, 'src/recruit/index.html'),
          contact: path.resolve(__dirname, 'src/contact/index.html'),
        },
        output: {
          assetFileNames: (assetInfo) => {
            let result = 'assets/images/[name][extname]';
            if (assetInfo.name.split('.')[1] === 'css') {
              result = 'assets/styles/[name][extname]';
            }
            return result;
          },
          chunkFileNames: 'assets/js/[name].js',
          entryFileNames: 'assets/js/[name].js',
        },
      },
    },
    preview: {
      host: true,
    },
    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, './src/partials'),
        enforce: 'pre'
      }),
      eslint({
        cache: false,
        fix: true,
      }),
      // legacy({
      //   targets: ['> 0.1% and not dead'],
      // }),
    ],
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    // VitePWA({
    //   manifest: 'public/manifest.json',
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
    //         handler: 'CacheFirst',
    //       },
    //     ],
    //   },
    // }),
  ],
});

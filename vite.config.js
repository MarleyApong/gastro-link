import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      manifest: VitePWA({
        manifest: {
          display: 'standalone',
          display_override: ['window-controls-overlay'],
          lang: 'fr-FR',
          name: 'Gastro Link Resto',
          short_name: 'Gastro Link',
          description: 'Simplifly your live with Gastro Link',
          theme_color: '#19223c',
          background_color: '#fff',
          icons: [
            {
              src: '/gastro.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: '/gastro.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/gastro.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    })
  ],
})

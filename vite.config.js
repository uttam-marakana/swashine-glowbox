import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'google-site-verification',
      transformIndexHtml(html) {
        const verification = process.env.VITE_GOOGLE_SITE_VERIFICATION
        if (!verification) return html
        if (!/^[A-Za-z0-9_-]+$/.test(verification)) {
          throw new Error('VITE_GOOGLE_SITE_VERIFICATION contains invalid characters.')
        }
        return html.replace(
          '</head>',
          `  <meta name="google-site-verification" content="${verification}" />\n  </head>`,
        )
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
})

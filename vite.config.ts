import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        host: '0.0.0.0',
        port: Number(env.PORT) || 3000,
        strictPort: true,
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: 5173,
        },
        watch: {
            usePolling: true,
        },
        // Allow all hosts in production for Railway deployment.
        // This is necessary because the host is dynamic.
        // In a real production environment, you would want to
        // be more restrictive.
        // Example: allowedHosts: ['.railway.app']
        allowedHosts: mode === 'production' ? ['*'] : undefined,
    }
    };
});

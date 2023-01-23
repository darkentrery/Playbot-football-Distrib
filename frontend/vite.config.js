import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path'
// @ts-ignore
import fs from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig((env) => {
  // const base = env.mode === 'production' ? '/hybrid/' : '/';
  const base = '/';

  return {
    base,
    resolve:{
    alias:{
      'src': resolve(__dirname,'src'),
    }
  },
  esbuild: {
    loader: "jsx",
      include: /src\/.*\.jsx?$/,
      // loader: "tsx",
      // include: /src\/.*\.[tj]sx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: "load-js-files-as-jsx",
            setup(build) {
              build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({ // i modified the regex here
                loader: "jsx",
                contents: await fs.readFile(args.path, "utf8"),
              }));
            },
          },
        ],
      },
    },
    server: {
      fs: {
        allow: [
          '../..'
        ]
      }
    },
    plugins: [
      react()
    ],
  };
});

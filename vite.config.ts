import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import {fileURLToPath} from 'node:url';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
export default defineConfig({
  plugins: [react(),eslintPlugin(),nodePolyfills({include:['util']})],
  resolve:{
    alias:{
      "@redux" : fileURLToPath(new URL('src/redux', import.meta.url)),
      "@components" : fileURLToPath(new URL('src/components', import.meta.url)),
      "@styling" : fileURLToPath(new URL('src/styling', import.meta.url)),
      "@pages" : fileURLToPath(new URL('src/pages', import.meta.url)),
      "@routes" : fileURLToPath(new URL('src/routes', import.meta.url)),
      "@utils" : fileURLToPath(new URL('src/utils', import.meta.url)),
      "@public" : fileURLToPath(new URL('public/', import.meta.url)),
      "@assets" : fileURLToPath(new URL('src/assets', import.meta.url)),
      "@types" : fileURLToPath(new URL('src/types', import.meta.url)),
      "@lib" : fileURLToPath(new URL('src/lib', import.meta.url)),
      "@connector" : fileURLToPath(new URL('src/connector', import.meta.url)),
      "@/" : fileURLToPath(new URL('src/', import.meta.url)),
    }
  },
  server: {
    open: true,
    host: true,
  },
});


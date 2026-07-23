import { build, defineConfig } from 'vite';
import { format, resolve } from 'node:path';

export default defaultConfig({
    build: {
        lib: { entry: resolve(__dirname, 'src/index.ts'), format: ['es'], fileName: 'index' },
    },
})
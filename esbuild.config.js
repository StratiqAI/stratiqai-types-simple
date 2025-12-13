import { build } from 'esbuild';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entryPoints = [
  join(__dirname, 'src', 'index.ts'),
  join(__dirname, 'src', 'schema.ts'),
  join(__dirname, 'src', 'operations.ts'),
];

async function buildProject() {
  try {
    // Build TypeScript files
    await build({
      entryPoints,
      bundle: false,
      outdir: 'dist',
      format: 'esm',
      platform: 'node',
      target: 'esnext',
      sourcemap: true,
      outExtension: {
        '.js': '.js'
      },
      outbase: join(__dirname, 'src'),
    });
    
    // Copy schema.graphql to dist directory
    const schemaSrc = join(__dirname, 'src', 'schema.graphql');
    const schemaDest = join(__dirname, 'dist', 'schema.graphql');
    
    if (existsSync(schemaSrc)) {
      // Ensure dist directory exists
      const distDir = join(__dirname, 'dist');
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }
      copyFileSync(schemaSrc, schemaDest);
      console.log('✓ Copied schema.graphql to dist');
    }
    
    console.log('✓ Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();

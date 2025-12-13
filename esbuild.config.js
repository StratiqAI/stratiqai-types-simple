import { build } from 'esbuild';
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Recursively find all .ts files in a directory
function findTsFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  files.forEach(file => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function buildProject() {
  try {
    // Find all TypeScript files to build
    const graphqlFiles = findTsFiles(join(__dirname, 'src', 'graphql'));
    const allTsFiles = [
      join(__dirname, 'src', 'index.ts'),
      join(__dirname, 'src', 'schema.ts'),
      join(__dirname, 'src', 'operations.ts'),
      ...graphqlFiles
    ];
    
    console.log(`Building ${allTsFiles.length} TypeScript files (${graphqlFiles.length} graphql files)...`);
    console.log('GraphQL files:', graphqlFiles.slice(0, 3).map(f => f.replace(__dirname, '')).join(', '), '...');
    
    // Build all TypeScript files
    const result = await build({
      entryPoints: allTsFiles,
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
      logLevel: 'info',
    });
    
    console.log(`✓ Built ${allTsFiles.length} TypeScript files`);
    
    // Verify some files were created
    const testFile = join(__dirname, 'dist', 'graphql', 'queries', 'index.js');
    if (existsSync(testFile)) {
      console.log('✓ Verified graphql/queries/index.js exists');
    } else {
      console.warn('⚠ graphql/queries/index.js was not created');
    }
    
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

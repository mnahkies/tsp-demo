#!/usr/bin/env tsx

/**
 * Script to generate TypeScript Express server scaffold from TypeSpec
 * using @nahkies/openapi-code-generator
 */

import {execSync} from 'child_process';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TYPESPEC_FILE = join(__dirname, '../main.tsp');
const OUTPUT_DIR = join(__dirname, '../src/generated-server');
const GENERATED_FILE = join(OUTPUT_DIR, 'generated.ts');

console.log('Generating TypeScript Express server from TypeSpec...');
console.log(`TypeSpec file: ${TYPESPEC_FILE}`);
console.log(`Output directory: ${OUTPUT_DIR}`);

try {
  console.log('\nRunning @nahkies/openapi-code-generator...');

  execSync(
    `npx @nahkies/openapi-code-generator \
      --input  ${TYPESPEC_FILE} \
      --input-type typespec \
      --output ${OUTPUT_DIR} \
      --template typescript-express`,
    {
      stdio: 'inherit',
      cwd: join(__dirname, '..'),
    }
  );

  console.log('\n✓ Express server scaffold generated successfully!');
  console.log(`  Location: ${OUTPUT_DIR}`);

  // Post-process generated.ts to fix imports
  console.log('\nPost-processing generated.ts...');

  // let content = readFileSync(GENERATED_FILE, 'utf-8');

  // Replace import paths
  // content = content.replace(/from ['"]\.\/(models)['"]/g, 'from "./$1.js"');
  // content = content.replace(/from ['"]\.\/(schemas)['"]/g, 'from "./$1.js"');
  // content = content.replace(/from ['"]express['"]/g, 'from "ultimate-express"');

  // writeFileSync(GENERATED_FILE, content, 'utf-8');

  // console.log('✓ Post-processing complete!');
} catch (error) {
  console.error('\n✗ Error generating server:', error);
  process.exit(1);
}

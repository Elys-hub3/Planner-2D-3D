#!/usr/bin/env bun

import { existsSync, rmSync, mkdirSync, readdirSync, statSync, cpSync, copyFileSync, watch } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const demoDistPath = join(__dirname, '../../react-planner-master/demo/dist');
const publicPlannerPath = join(__dirname, '../public/planner');

// Copy function
function copyDemo(): void {
  try {
    // Remove existing planner directory
    if (existsSync(publicPlannerPath)) {
      rmSync(publicPlannerPath, { recursive: true, force: true });
    }

    // Create new directory
    mkdirSync(publicPlannerPath, { recursive: true });

    // Copy all files from demo/dist to public/planner
    const files = readdirSync(demoDistPath);
    
    files.forEach(file => {
      const srcFile = join(demoDistPath, file);
      const destFile = join(publicPlannerPath, file);
      
      if (statSync(srcFile).isDirectory()) {
        // Copy directory recursively
        cpSync(srcFile, destFile, { recursive: true });
      } else {
        // Copy file
        copyFileSync(srcFile, destFile);
      }
    });

    console.log('✅ Demo files synced successfully!');
    console.log(`📁 Copied from: ${demoDistPath}`);
    console.log(`📁 Copied to: ${publicPlannerPath}`);
    
    // List copied files
    const copiedFiles = readdirSync(publicPlannerPath);
    console.log('📄 Files:', copiedFiles.join(', '));
    
  } catch (error: any) {
    console.error('❌ Error syncing demo files:', error.message);
    process.exit(1);
  }
}

// Run the copy
copyDemo();

// If --watch flag is passed, watch for changes
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for demo changes...');
  
  let debounceTimer: NodeJS.Timeout | null = null;
  
  watch(demoDistPath, { recursive: true }, (eventType, filename) => {
    if (filename) {
      console.log(`📝 Demo file changed: ${filename}`);
      
      // Debounce the copy operation
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      
      debounceTimer = setTimeout(() => {
        copyDemo();
        debounceTimer = null;
      }, 500);
    }
  });
}
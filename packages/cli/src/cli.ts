#!/usr/bin/env node

/**
 * CLI executable entry point
 */

import CytracCLI from './index.js';

const cli = new CytracCLI();
cli.run(process.argv).catch((error: Error) => {
  console.error('❌ CLI Error:', error.message);
  process.exit(1);
});

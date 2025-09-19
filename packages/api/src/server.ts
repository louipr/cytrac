#!/usr/bin/env node

/**
 * API server executable entry point
 */

import CytracAPIServer from './index.js';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const server = new CytracAPIServer(port);

server.start().catch((error: Error) => {
  console.error('❌ Failed to start API server:', error.message);
  process.exit(1);
});

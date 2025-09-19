// Jest setup file for global test configuration
global.console = {
  ...console,
  // Suppress console.log during tests unless in verbose mode
  log: process.env.NODE_ENV === 'test' && !process.env.JEST_VERBOSE ? jest.fn() : console.log,
  warn: console.warn,
  error: console.error,
};

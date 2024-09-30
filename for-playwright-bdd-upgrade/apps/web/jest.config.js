const nextJest = require("next/jest");

// Create Jest configuration using the nextJest function
const createJestConfig = nextJest({
  dir: "./",
});

// Custom Jest configuration options
const customJestConfig = {
  setupFiles: ["./jest.env.js", "./jest.polyfills.js"],
  // Specify setup files to be executed after the test environment is set up
  setupFilesAfterEnv: ["./jest.setup.js"],
  // Set the test environment to jest-environment-jsdom for running tests in a browser-like environment
  testEnvironment: "jest-environment-node",
  resolver: "./jest.resolver.js",
};

// Export the merged Jest configuration by combining the createJestConfig and customJestConfig objects
module.exports = createJestConfig(customJestConfig);

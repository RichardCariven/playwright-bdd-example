const dotenv = require("dotenv");
const path = require("path");

/**
 * When running Jest tests we want the same environment variables set as when running the real app.
 */
const applyEnvFile = () => {
  const dotenvPath = path.resolve(process.cwd(), ".env.vercel.preview");
  const result = dotenv.config({ path: dotenvPath });

  if (result.error) {
    throw result.error;
  }
};

applyEnvFile();

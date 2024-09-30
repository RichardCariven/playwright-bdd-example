import fs from "fs";
import path from "path";
import dotenv from "dotenv";

describe(`Files ".env.*"`, () => {
  const getFile = (type: string) =>
    fs.readFileSync(path.join(__dirname, `../../${type}`), `utf8`);

  const vercelProductionEnv = dotenv.parse(getFile(`.env.vercel.production`));

  // Create vercel production as match object.
  const vercelProductionExpected: Record<string, unknown> = {};
  Object.keys(vercelProductionEnv).forEach((key) => {
    vercelProductionExpected[key] = expect.any(String);
  });

  test(`File ".env.vercel.preview" has same keys as ".env.vercel.production"`, () => {
    const vercelPreviewEnv = dotenv.parse(getFile(`.env.vercel.preview`));
    expect(vercelPreviewEnv).toEqual(vercelProductionExpected);
  });

  test(`File ".env.development" has same keys or superset of ".env.vercel.production"`, () => {
    const developmentEnv = dotenv.parse(getFile(`.env.development`));
    expect(developmentEnv).toMatchObject(vercelProductionExpected);
  });
});

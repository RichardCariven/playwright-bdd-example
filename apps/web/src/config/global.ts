import { type GlobalConfig } from "./config.d";

const config: GlobalConfig = {
  default: {
    domain: "rayo-web.vercel.app",
    cookieDomain: "rayo-web.vercel.app",
    oAuthVerifyPath: "api/auth/verify",
    pusherKey: "43043770d87848eef1eb",
  },
  stage: {
    domain: "rayo-web.vercel.app",
  },
};

export default config;

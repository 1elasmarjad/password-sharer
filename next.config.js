/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.discordapp.com",
      port: '',
      pathname: "/avatars/**"
    }],
  },
};

export default config;

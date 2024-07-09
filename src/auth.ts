// src/auth.ts
import { Lucia } from "lucia";
import { luciaAdapter } from "./server/db/index";
import { Discord } from "arctic";
import { env } from "./env";

export const lucia = new Lucia(luciaAdapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      name: attributes.name,
      avatar: attributes.avatar,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
  avatar: string | null;
}

export const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  env.DISCORD_REDIRECT_URI,
);

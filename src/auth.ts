// src/auth.ts
import { Lucia } from "lucia";
import { luciaAdapter } from "./server/db/index";
import { Discord, Google } from "arctic";
import { env } from "./env";
import { type users } from "./server/db/schema";
import { type InferSelectModel } from "drizzle-orm";

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
    DatabaseUserAttributes: InferSelectModel<typeof users>;
  }
}

export const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  env.DISCORD_REDIRECT_URI,
);

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI,
)

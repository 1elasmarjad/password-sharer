// app/login/github/callback/route.ts
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { discord, lucia } from "~/auth";
import { db } from "~/server/db";
import { oauthState, users } from "~/server/db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("discord_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  const tokens = await discord.validateAuthorizationCode(code);

  console.log("Validated tokens", tokens);

  const discordUserResponse = await fetch(
    "https://discord.com/api/v10/users/@me",
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const discordUser: DiscordUser = await discordUserResponse.json();

  console.log("Fetched discord user", discordUser);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.discordId, discordUser.id),
  });

  console.log("Existing user", existingUser);

  let userId: string | undefined = undefined;

  if (existingUser) {
    userId = existingUser.id;
  } else {
    userId = generateIdFromEntropySize(10);

    await db.insert(users).values({
      id: userId,
      discordId: discordUser.id,
      name: discordUser.username,
    });
  }

  // Create session
  console.log("Creating session for user", userId);

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  // get database state data
  const dbStateData = await db.query.oauthState.findFirst({
    where: eq(oauthState.state, state),
  });

  const destinationUri = dbStateData?.destinationUri ?? "/";

  return new Response(null, {
    status: 302,
    headers: {
      Location: destinationUri, // Redirect to home page
    },
  });
}

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot: boolean;
  system: boolean;
  mfa_enabled: boolean;
  locale: string;
  verified: boolean;
  email: string | null;
  flags: number;
  premium_type: number;
  public_flags: number;
}

// app/login/github/callback/route.ts
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { discord, google, lucia } from "~/auth";
import { db } from "~/server/db";
import { oauthStates, users } from "~/server/db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (!state) {
    console.error("No state", { code, state, error });
    return new Response(null, {
      status: 400,
    });
  }

  // get database state data
  const dbStateData = await db.query.oauthStates.findFirst({
    where: eq(oauthStates.state, state),
  });

  const destinationUri = dbStateData?.destinationUri ?? "/";

  if (error) {
    console.error("Error from Google", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: destinationUri,
      },
    });
  }

  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    console.error("Invalid state or code", { code, state, storedState });
    return new Response(null, {
      status: 400,
    });
  }

  if (error) {
    console.error("Error from Google", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: destinationUri,
      },
    });
  }

  const codeVerifier = dbStateData?.codeVerifier;
  const tokens = await google.validateAuthorizationCode(code, codeVerifier!);

  console.log("Validated tokens", tokens);

  const googleUserResponse = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    },
  );

  const googleUser = (await googleUserResponse.json()) as GoogleUser;

  console.log("Fetched Google user", googleUser);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, googleUser.email),
  });

  console.log("Existing user", existingUser);

  let userId: string | undefined = undefined;

  if (existingUser) {
    userId = existingUser.id;
  } else {
    userId = generateIdFromEntropySize(10);

    console.log(`Creating new user with id ${userId}`);
    throw new Error("Not implemented");

  //   await db.insert(users).values({
  //     id: userId,
  //     email: googleUser.email,
  //     name: googleUser.username,
  //     avatar: discordUser.avatar
  //       ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}`
  //       : null,
  //   });
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

  return new Response(null, {
    status: 302,
    headers: {
      Location: destinationUri, // Redirect to home page
    },
  });
}

interface GoogleUser {
  email: string;
}

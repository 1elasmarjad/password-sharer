import { generateState } from "arctic";
import { cookies } from "next/headers";
import { discord } from "~/auth";
import { db } from "~/server/db";
import { oauthStates } from "~/server/db/schema";

export async function GET(request: Request): Promise<Response> {
  // where this request came from so we can redirect back
  const requestUrl = new URL(request.url);

  let destination: string;

  const destParam = requestUrl.searchParams.get("dest");

  if (destParam && !destParam.startsWith("/")) {
    destination = requestUrl.searchParams.get("dest")!;
  } else {
    destination =
      request.headers.get("referer") ?? request.headers.get("referrer") ?? "/";
  }

  const state = generateState();
  const url = await discord.createAuthorizationURL(state, {
    scopes: ["identify", "email"],
  });

  cookies().set("discord_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  await db.insert(oauthStates).values({
    state: state,
    provider: "discord",
    destinationUri: destination,
  });

  return Response.redirect(url);
}

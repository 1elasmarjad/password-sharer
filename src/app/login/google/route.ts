import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { google } from "~/auth";
import { db } from "~/server/db";
import { oauthStates } from "~/server/db/schema";

export async function GET(request: Request): Promise<Response> {
  // where this request came from so we can redirect back
  const requestUrl = new URL(request.url);

  let destination: string;

  const destParam = requestUrl.searchParams.get("dest");

  if (destParam && !destParam.startsWith("http")) {
    destination = requestUrl.searchParams.get("dest")!;
  } else {
    destination =
      request.headers.get("referer") ?? request.headers.get("referrer") ?? "/";
  }

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile"],
  });

  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  await db.insert(oauthStates).values({
    state: state,
    provider: "google",
    destinationUri: destination,
    codeVerifier: codeVerifier,
  });

  return Response.redirect(url);
}

"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { codes } from "../db/schema";
import { validateRequest } from "./auth";
import { alertMyFriends } from "./friends";

export async function getCode(id: string) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const data = await db.query.codes.findFirst({
    where: eq(codes.id, id),
  });

  if (!data) {
    return null;
  }

  if (data?.userId !== user.id) {
    throw new Error("Not authorized");
  }

  // todo add alert ratelimit so users are not spammed

  // alert friends that the user has viewed the code
  await alertMyFriends({
    title: `${user.name} Code Viewed`,
    body: `${user.name} has viewed a code`,
  });

  return data;
}

export async function myCodes() {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const data = await db.query.codes.findMany({
    where: eq(codes.userId, user.id),
  });

  return data;
}

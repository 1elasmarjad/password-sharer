"use server";

import { ConsoleLogWriter } from "drizzle-orm";
import { db } from "../db";
import { codes } from "../db/schema";
import { validateRequest } from "./auth";
import { alertMyFriends } from "./friends";

// create a password for a given user
export async function generateCode(length?: number): Promise<{ code: string }> {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  if (!length) {
    length = 4;
  }

  // create a random code of the integers
  const code = Array.from({ length }, () =>
    Math.floor(Math.random() * 10),
  ).join("");

  return {
    code,
  };
}

export async function saveCode(code: string): Promise<void> {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  await db.transaction(async (tx) => {
    await tx.insert(codes).values({
      userId: user.id,
      code,
    });

    console.log(`New code saved in db for ${user.name}: ${code}`);

    await alertMyFriends({
      title: `New One-Time Password Generated for ${user.name}`,
      body: `NEW OTP: ${code}`,
    });
  });

  return;
}

"use server";

import { env } from "~/env";
import { db } from "../db";
import { codes } from "../db/schema";
import { validateRequest } from "./auth";
import { alertMyFriends } from "./friends";
import crypto from "crypto";

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

export async function encryptCode(code: string): Promise<string> {
  const iv = crypto.randomBytes(12);
  const key = Buffer.from(env.ENCRYPTION_KEY, "hex");

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(code, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");  // Get the auth tag

  return `${encrypted}:${iv.toString("hex")}:${authTag}`;
}

export async function decryptCode(encryptedCode: string): Promise<string> {
  // Split the encrypted string into its components
  const [encrypted, ivHex, authTagHex] = encryptedCode.split(":");

  // Add checks to ensure all parts are defined
  if (!encrypted || !ivHex || !authTagHex) {

    console.log(encrypted)
    console.log(ivHex)
    console.log(authTagHex)

    throw new Error("Invalid encrypted code format");
  }

  const key = Buffer.from(env.ENCRYPTION_KEY, "hex"); // Convert hex key to buffer
  const iv = Buffer.from(ivHex, "hex"); // Convert IV to buffer

  // Create the decipher instance
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  // Set the authentication tag
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export async function saveCode(code: string): Promise<void> {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  await db.transaction(async (tx) => {
    await tx.insert(codes).values({
      userId: user.id,
      code: await encryptCode(code),
    });

    console.log(`New code saved in db for ${user.name}: ${code}`);

    await alertMyFriends({
      title: `New One-Time Password Generated for ${user.name}`,
      body: `NEW OTP: ${code}`,
    });
  });

  return;
}

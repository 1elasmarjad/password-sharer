"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { codes } from "../db/schema";
import { validateRequest } from "./auth";

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

  return data;
}

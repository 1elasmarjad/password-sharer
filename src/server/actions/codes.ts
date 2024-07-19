"use server";

import { eq, type InferSelectModel, count as sqlcount } from "drizzle-orm";
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

export async function myCodes({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{
  data: InferSelectModel<typeof codes>[];
  count: number;
  prevPageExists: boolean;
  nextPageExists: boolean;
}> {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const data = await db.query.codes.findMany({
    where: eq(codes.userId, user.id),
    limit: limit,
    offset: (page - 1) * limit,
  });

  const countResult = await db
    .select({ count: sqlcount() })
    .from(codes)
    .where(eq(codes.userId, user.id));

  const count = countResult[0]?.count ?? 0;

  const maxPages = Math.ceil(count / limit);

  return {
    data,
    count,
    prevPageExists: page > 1,
    nextPageExists: page < maxPages,
  };
}

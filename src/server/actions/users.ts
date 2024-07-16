import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export async function fetchUser({ userId }: { userId: string }) {
  const data = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return data;
}

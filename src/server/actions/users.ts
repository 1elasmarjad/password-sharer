import { db } from "../db";

interface User {
  id: string;
  name: string;
}

export async function getUsers(): Promise<User[]> {
  const allUsers = await db.query.users.findMany();

  const toReturn = allUsers.map((user) => {
    return {
      id: user.id,
      name: user.name,
    } satisfies User;
  });

  return toReturn;
}

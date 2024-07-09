import { db } from "../db";

interface User {
  id: string;
  name: string;
}

export async function getUsers(): Promise<User[]> {
  const allUsers = await db.query.users.findMany();

  return allUsers.map((user) => ({
    id: user.id,
    name: user.name,
  }));
}

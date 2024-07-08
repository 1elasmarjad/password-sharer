"use server";

// create a password for a given user
export async function createCode({
  userId,
  length = 4,
}: {
  userId: string;
  length?: number;
}): Promise<string> {
  // create a random code of the integers
  const code = Array.from({ length }, () =>
    Math.floor(Math.random() * 10),
  ).join("");

  return code;
}

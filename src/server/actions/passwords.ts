"use server";

// create a password for a given user
export async function generateCode(length?: number): Promise<{ code: string }> {
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

export async function saveCode(): Promise<void> {
  // save the code to the database TODO
  return;
}

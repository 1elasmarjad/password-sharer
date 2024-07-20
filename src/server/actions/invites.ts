"use server";

import { env } from "~/env";
import { validateRequest } from "./auth";
import { addFriend } from "./friends";
import { fetchUser } from "./users";

export async function createFriendInvite() {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // this is not safe for production, but it's fine for this example
  return {
    id: `invite-${user.id}`,
    link: env.INVITE_ACCEPT.replace("[inviteId]", `invite-${user.id}`),
  };
}

export async function fetchInvite({ inviteId }: { inviteId: string }) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const targetUserId = inviteId.split("-")[1];

  if (!targetUserId) {
    throw new Error("Invalid invite");
  }

  return { user: await fetchUser({ userId: targetUserId }), inviteId };
}

export async function acceptFriendInvite({ inviteId }: { inviteId: string }) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const targetUserId = inviteId.split("-")[1];

  if (!targetUserId) {
    throw new Error("Invalid invite");
  }

  // same user?
  if (user.id === targetUserId) {
    throw new Error("Cannot invite self");
  }

  return await addFriend({ userId: targetUserId, friendUserId: user.id });
}

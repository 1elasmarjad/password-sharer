import { eq } from "drizzle-orm";
import { db } from "../db";
import { friends } from "../db/schema";
import { validateRequest } from "./auth";
import { env } from "~/env";
import twilioClient from "~/lib/twilio";

export type Channel = {
  id: string;
  type: number;
};

export type Message = {
  id: string;
  channel_id: string;
  timestamp: string;
};

export async function getMyFriends() {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const data = await db.query.friends.findMany({
    where: eq(friends.userId, user.id),
    with: {
      friend: true,
    },
  });

  return data;
}

export async function alertMyFriends({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const friends = await getMyFriends();

  for (const friend of friends) {
    if (!friend.friend.phoneNumber) {
      continue;
    }

    await sendSMSAlert({
      title,
      body,
      phoneNumber: friend.friend.phoneNumber,
    });
  }
}

export async function sendDiscordAlert({
  title,
  body,
  discordId,
}: {
  title: string;
  body: string;
  discordId: string;
}) {
  const createDM = await fetch(
    "https://discord.com/api/v10/users/@me/channels",
    {
      method: "POST",
      body: JSON.stringify({
        recipient_id: discordId,
      }),
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  const dmChannel = (await createDM.json()) as Channel;

  console.log(`DM Channel: ${dmChannel.id}, Status: ${createDM.status}`);

  const createMessage = await fetch(
    `https://discord.com/api/v10/channels/${dmChannel.id}/messages`,
    {
      method: "POST",
      body: JSON.stringify({
        embeds: [
          {
            title,
            description: body,
          },
        ],
      }),
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  const message = (await createMessage.json()) as Message;

  console.log(`Message: ${message.id}, Status: ${createMessage.status}`);

  return message;
}

export async function sendSMSAlert({
  title,
  body,
  phoneNumber,
}: {
  title: string;
  body: string;
  phoneNumber: string;
}) {
  return await twilioClient.messages.create({
    body: `${title}\n${body}`,
    from: "+15855586497",
    to: phoneNumber,
  });
}

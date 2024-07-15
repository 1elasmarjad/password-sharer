// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `${name}`);

export const users = createTable("user", {
  id: text("id").notNull(),
  discordId: text("discord_id"),
  phoneNumber: text("phone_number"),
  name: text("name", { length: 256 }).notNull(),
  avatar: text("avatar"),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

// export const userRelations = relations(users, ({ many }) => ({
//   friends: many(friends, { relationName: "friendsRelation" }),
//   sessions: many(sessions),
// }));

export const sessions = createTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: int("expires_at").notNull(),
});

// export const sessionRelations = relations(sessions, ({ one }) => ({
//   user: one(users, {
//     fields: [sessions.userId],
//     references: [users.id],
//   }),
// }));

export const oauthStates = createTable("oauth_state", {
  state: text("state").notNull().primaryKey(),
  provider: text("provider").notNull(),
  destinationUri: text("destination_uri").notNull(),
});

export const friends = createTable("friend", {
  id: int("id").notNull().primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  friendId: text("friend_id").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  deletedAt: int("deleted_at", { mode: "timestamp" }),
});

export const friendRelations = relations(friends, ({ one }) => ({
  friend: one(users, {
    fields: [friends.friendId],
    references: [users.id],
  }),
}));

// export const friendsRelations = relations(friends, ({ one }) => ({
//   user: one(users, {
//     fields: [friends.userId],
//     references: [users.id],
//   }),
//   friend: one(users, {
//     fields: [friends.friendId],
//     references: [users.id],
//     relationName: "friendsRelation",
//   }),
// }));

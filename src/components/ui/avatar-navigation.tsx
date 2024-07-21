"use client";

import { type User } from "lucia";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";

export default function AvatarNavigation({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user.avatar ?? ""}
          width={38}
          height={38}
          alt={`${user.name}s pfp`}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/friends">My Friends</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="block sm:hidden">
          <Link href="/generate">New Code</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="block sm:hidden">
          <a href="/codes">My Codes</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

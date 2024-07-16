"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { acceptFriendInvite } from "~/server/actions/invites";

export default function AcceptInviteBlock({ inviteId }: { inviteId: string }) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const friendId = await acceptFriendInvite({ inviteId });
        toast.success("Invite accepted!", { position: "bottom-center" });
        router.push(`/friends?focus=${friendId}`);
      } catch {
        toast.error("Failed to accept invite", { position: "bottom-center" });
        return;
      }
    },
  });

  return (
    <div>
      <button onClick={() => mutate()}>
        {isPending ? "Accepting..." : "Accept Invite"}
      </button>
    </div>
  );
}

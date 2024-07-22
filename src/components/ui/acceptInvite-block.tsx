"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { acceptFriendInvite } from "~/server/actions/invites";

export default function AcceptInviteBlock({
  inviteId,
  className,
}: {
  inviteId: string;
  className?: string;
}) {
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
    <>
      <button onClick={() => mutate()} className={className}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin my-0.5" size={16} />
          </>
        ) : (
          "Accept Invite"
        )}
      </button>
    </>
  );
}

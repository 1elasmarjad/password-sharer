"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getCode } from "~/server/actions/codes";

export default function HiddenCode({ codeId }: { codeId: string }) {
  const [visible, setVisible] = useState<boolean>(false);

  const { data, mutate, isPending } = useMutation({
    mutationFn: async () => {
      const code = await getCode(codeId);

      if (!code) {
        toast.error("Code not found");
        return;
      }

      setVisible(true);
      return code;
    },
  });

  if (visible) {
    return (
      <div className="flex h-8 w-full max-w-36 items-center justify-center rounded-md bg-[#444444]">
        {data?.code}
      </div>
    );
  }

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="flex h-8 w-full max-w-36 animate-pulse items-center justify-center rounded-md bg-[#444444]"
    >
      {isPending ? <Loader2 className="animate-spin" /> : "Reveal Code"}
    </button>
  );
}

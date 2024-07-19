"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getCode } from "~/server/actions/codes";
import { formatDistance } from "date-fns";

export default function HiddenCode({
  codeData,
}: {
  codeData: {
    id: string;
    userId: string;
    createdAt: Date;
  };
}) {
  const [visible, setVisible] = useState<boolean>(false);

  const { data, mutate, isPending } = useMutation({
    mutationFn: async () => {
      const code = await getCode(codeData.id);

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
      <div className="flex h-24 w-full max-w-72 flex-col items-center justify-center gap-1 rounded-sm bg-[#444444] text-lg">
        <span className="font-medium text-green-500">{data?.code}</span>
        <span className="text-sm">
          {formatDistance(codeData.createdAt, new Date(), {
            addSuffix: true,
          }).replace("about ", "")}
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="flex h-24 w-full max-w-72 flex-col items-center justify-center rounded-sm bg-[#444444] text-lg hover:bg-[#333333] hover:transition-all"
    >
      <span className="font-medium text-[#77B9EE]">
        {isPending ? <Loader2 className="animate-spin" /> : "Reveal Code"}
      </span>
      <span className="text-sm">
        {formatDistance(codeData.createdAt, new Date(), {
          addSuffix: true,
        }).replace("about ", "")}
      </span>
    </button>
  );
}

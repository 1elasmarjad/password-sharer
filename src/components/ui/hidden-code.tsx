"use client";

import { useMutation } from "@tanstack/react-query";
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
    return <div>{data?.code}</div>;
  }

  return (
    <button onClick={() => mutate()} disabled={isPending}>
      Reveal Code
    </button>
  );
}

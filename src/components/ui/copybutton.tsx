"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function CopyButton({
  code,
  className,
  size,
}: {
  code: string;
  className?: string;
  size?: number;
}) {
  return (
    <button
      className={`${className}`}
      onClick={async () => {
        await navigator.clipboard.writeText(code);
        toast.success("Copied to clipboard!", {
          position: "bottom-center",
        });
      }}
    >
      <Copy className="select-none" size={size}/>
    </button>
  );
}

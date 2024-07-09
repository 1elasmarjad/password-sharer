"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function CopyButton({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <Copy
      className={className}
      onClick={async () => {
        await navigator.clipboard.writeText(code);
        toast.success("Copied to clipboard!");
      }}
    ></Copy>
  );
}
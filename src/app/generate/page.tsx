"use client";

import { useQuery } from "@tanstack/react-query";
import { CircleCheckBig, RefreshCw } from "lucide-react";
import CopyButton from "~/components/ui/copybutton";
import { createCode } from "~/server/actions/passwords";

export default function GeneratePage() {
  const { data } = useQuery({
    queryKey: ["generateCode"],
    queryFn: createCode,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#212429]">
      <div className="flex flex-col items-center rounded-md bg-[#222222] px-16 py-12">
        <p className="select-none text-xl text-gray-400">
          Your One-Time Password
        </p>
        <div className="flex items-end gap-2">
          <h1 className="pt-3 text-8xl font-bold text-[#3a9aed]">
            {data?.code}
          </h1>
          <CopyButton
            className="mb-2 text-gray-400 hover:cursor-pointer"
            code={data?.code ?? ""}
          />
        </div>

        <button className="group mt-8 flex w-full items-center justify-center gap-2 rounded border-2 border-gray-700 py-1 text-lg tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700">
          Regenerate
          <RefreshCw className="h-4 w-4 group-hover:animate-spin" />
        </button>
        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded border-2 border-gray-700 py-1 text-lg tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700">
          Use Password
          <CircleCheckBig className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
  [];
}

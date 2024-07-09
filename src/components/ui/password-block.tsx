"use client";

import { useQuery } from "@tanstack/react-query";
import { CircleCheckBig, LoaderCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import CopyButton from "./copybutton";
import { generateCode } from "~/server/actions/passwords";
import { type AuthContext } from "~/server/actions/auth";

export default function OTPBlock({
  authContext,
}: {
  authContext: AuthContext;
}) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["generateCode"],
    queryFn: async () => await generateCode(),
  });

  return (
    <div className="flex flex-col items-center rounded-md bg-[#222222] px-16 py-12">
      <p className="select-none text-xl text-gray-400">
        Your One-Time Password
      </p>
      <div className="flex items-end gap-3">
        {!isLoading ? (
          <>
            <h1 className="mt-3 text-8xl font-bold text-[#3a9aed]">
              {data?.code}
            </h1>
            <CopyButton
              className="mb-2 select-none text-gray-400 transition-all hover:text-gray-200"
              code={data?.code ?? ""}
            />
          </>
        ) : (
          <div className="pt-4">
            <LoaderCircle className="h-12 w-12 animate-spin text-[#3a9aed]" />
          </div>
        )}
      </div>

      <button
        className="group mt-8 flex w-full select-none items-center justify-center gap-2 rounded border-2 border-gray-700 py-1 text-lg tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700"
        disabled={isLoading}
        onClick={async () => {
          await refetch();
          toast.success("New password generated!", {
            position: "top-center",
          });
        }}
      >
        Regenerate
        <RefreshCw className="h-4 w-4 group-hover:animate-spin" />
      </button>
      <button className="mt-6 flex w-full select-none items-center justify-center gap-2 rounded border-2 border-gray-700 py-1 text-lg tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700">
        Use Password
        <CircleCheckBig className="h-4 w-4" />
      </button>
    </div>
  );
}

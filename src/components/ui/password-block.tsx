"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CircleCheckBig,
  LoaderCircle,
  PartyPopper,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import CopyButton from "./copybutton";
import { generateCode, saveCode } from "~/server/actions/passwords";
import { useState } from "react";

export default function OTPBlock() {
  const [complete, setComplete] = useState<boolean>(false);

  const {
    data: codeData,
    refetch: codeRefetch,
    isLoading: codeIsLoading,
  } = useQuery({
    queryKey: ["generateCode"],
    queryFn: async () => await generateCode(),
  });

  const { mutate: saveCodeMutate, isPending: saveCodeLoading } = useMutation({
    mutationFn: async () => {
      if (!codeData?.code) {
        toast.error("No code to save", { position: "bottom-center" });
        throw new Error("No code to save");
      }

      try {
        await saveCode(codeData.code);
        toast.success("Password saved!", { position: "bottom-center" });
        setComplete(true);

        // redirect to the use page
      } catch (e) {
        toast.error("Failed to save password", { position: "bottom-center" });
      }
    },
  });

  return (
    <div className="flex flex-col items-center rounded-md bg-[#222222] px-16 py-12">
      <p className="select-none text-center text-lg text-gray-400 sm:text-xl">
        Your One-Time Password
      </p>
      <div className="flex items-end gap-3">
        {!codeIsLoading ? (
          <>
            <h1 className="mt-3 text-5xl font-bold text-[#3a9aed] sm:text-8xl">
              {codeData?.code}
            </h1>
            <CopyButton
              className="mb-2 select-none text-gray-400 transition-all hover:text-gray-200"
              code={codeData?.code ?? ""}
            />
          </>
        ) : (
          <div className="pt-4">
            <LoaderCircle className="h-12 w-12 animate-spin text-[#3a9aed]" />
          </div>
        )}
      </div>

      {!complete && (
        <>
          <button
            className="text-md group mt-8 flex w-full select-none items-center justify-center gap-2 rounded border-2 border-gray-700 py-1 tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700 sm:text-lg"
            disabled={codeIsLoading}
            onClick={async () => {
              await codeRefetch();
              toast.success("New password generated!", {
                position: "bottom-center",
              });
            }}
          >
            Regenerate
            <RefreshCw className="h-4 w-4 group-hover:animate-spin" />
          </button>
          <button
            onClick={async () => {
              saveCodeMutate();
            }}
            className="text-md mt-6 flex w-full select-none items-center justify-center gap-2 rounded border-2 border-gray-700 py-1 tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700 sm:text-lg"
          >
            {!saveCodeLoading && (
              <>
                Use Password
                <CircleCheckBig className="h-4 w-4" />
              </>
            )}

            {saveCodeLoading && (
              <LoaderCircle className="h-6 w-6 animate-spin text-[#3a9aed]" />
            )}
          </button>
        </>
      )}

      {complete && (
        <div className="flex flex-col items-center gap-3">
          <h3 className="mt-4 text-center text-2xl text-[#77B9EE]">
            Saved Password!
          </h3>
          <PartyPopper className="text-green-400" />
        </div>
      )}
    </div>
  );
}

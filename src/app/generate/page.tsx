"use server";

import { LogIn } from "lucide-react";
import Link from "next/link";
import OTPBlock from "~/components/ui/password-block";
import { validateRequest } from "~/server/actions/auth";

export default async function GeneratePage() {
  const authContext = await validateRequest();

  return (
    <main className="flex flex-col items-center">
      {authContext.user ? (
        <>
          <h1 className="my-12 text-xl text-gray-200">
            Welcome {authContext.user.name}
          </h1>
          <OTPBlock />
        </>
      ) : (
        <div className="my-12 flex flex-col items-center gap-4 rounded bg-[#222222] px-16 py-12">
          <h1 className="text-xl text-gray-400">You Must Login</h1>

          <Link
            href="/login/discord"
            className="flex items-center justify-center gap-2 rounded border-2 border-gray-700 px-6 pb-2.5 pt-2 text-lg tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700"
          >
            Discord Login <LogIn className="mt-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </main>
  );
}

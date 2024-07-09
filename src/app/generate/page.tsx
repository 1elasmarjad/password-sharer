import { LogIn } from "lucide-react";
import Link from "next/link";
import OTPBlock from "~/components/ui/password-block";
import { validateRequest } from "~/server/actions/auth";

export default async function GeneratePage() {
  const authContext = await validateRequest();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#212429]">
      {authContext.user ? (
        <OTPBlock authContext={authContext} />
      ) : (
        <div className="bg-[#222222]  flex flex-col px-16 py-12 items-center gap-4">
          <h1 className="text-xl text-gray-400">You Must Login</h1>

          <Link href="/login/discord" className="rounded border-2 border-gray-700 pt-2 pb-2.5 text-lg tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700 px-6 flex items-center justify-center gap-2">
            Discord Login <LogIn className="h-4 w-4 mt-1"/>
          </Link>
        </div>
      )}
    </main>
  );
}

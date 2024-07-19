"use server";

import { redirect } from "next/navigation";
import OTPBlock from "~/components/ui/password-block";
import { validateRequest } from "~/server/actions/auth";

export default async function GeneratePage() {
  const authContext = await validateRequest();

  if (!authContext.user) {
    redirect(`/login/google`);
  }

  return (
    <main className="flex flex-col items-center">
      <div className="mt-24">
        <OTPBlock />
      </div>
    </main>
  );
}

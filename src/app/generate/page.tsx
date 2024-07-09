import OTPBlock from "~/components/ui/password-block";
import { validateRequest } from "~/server/actions/auth";

export default async function GeneratePage() {
  const authContext = await validateRequest();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#212429]">
      <OTPBlock authContext={authContext} />
    </main>
  );
}

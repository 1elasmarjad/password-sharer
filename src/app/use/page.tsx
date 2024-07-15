import { validateRequest } from "~/server/actions/auth";
import { alertMyFriends } from "~/server/actions/friends";

export default async function UseCodePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const authContext = await validateRequest();

  if (!authContext.user) {
    return <div>You must login</div>;
  }

  const password = searchParams.p as string;

  return (
    <>
      {password}
      <form
        action={async () => {
          "use server";

          await alertMyFriends({
            title: `New One-Time Password Generated for ${authContext.user?.name}`,
            body: `NEW OTP: ${password}`,
          });
        }}
      >
        <button type="submit">Test</button>
      </form>
    </>
  );
}

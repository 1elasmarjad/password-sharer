import { validateRequest } from "~/server/actions/auth";

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
      <form>
        <button type="submit">Test</button>
      </form>
    </>
  );
}

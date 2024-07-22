import Image from "next/image";
import AcceptInviteBlock from "~/components/ui/acceptInvite-block";
import SectionLayout from "~/components/ui/sectionlayout";
import { validateRequest } from "~/server/actions/auth";
import { fetchInvite } from "~/server/actions/invites";

export default async function AcceptFriendInvite({
  params: { inviteId },
}: {
  params: { inviteId: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <>
        <p>Not authenticated</p>
      </>
    );
  }

  const { user: targetUser } = await fetchInvite({ inviteId });

  if (!targetUser) {
    return (
      <>
        <p>Invalid invite</p>
      </>
    );
  }

  return (
    <main className="flex flex-col">
      <SectionLayout className="mt-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-2 text-center text-2xl sm:text-4xl">
            {targetUser.name} would like you to a code buddy
          </h2>
          <p className="mb-8 text-center">
            This means you will be alerted when they generate or reveal codes.
          </p>
          <Image
            src={targetUser.avatar ?? ""}
            width={64}
            height={64}
            alt="pfp"
            className="rounded-full mb-6"
          />

          <AcceptInviteBlock inviteId={inviteId} className="text-md flex items-center justify-center gap-2 rounded border-2 border-gray-700 max-w-44 w-full py-1.5 tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700" />
        </div>
      </SectionLayout>
    </main>
  );
}

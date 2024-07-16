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
        <div>
          <h2>{targetUser.name}</h2>
          <Image
            src={targetUser.avatar ?? ""}
            width={64}
            height={64}
            alt="pfp"
          />
        </div>

        <AcceptInviteBlock inviteId={inviteId} />
      </SectionLayout>
    </main>
  );
}

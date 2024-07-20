import CopyButton from "~/components/ui/copybutton";
import SectionLayout from "~/components/ui/sectionlayout";
import { createFriendInvite } from "~/server/actions/invites";

export default async function CreateFriendInvite() {
  const invite = await createFriendInvite();

  return (
    <SectionLayout>
      <div>
        <div className="mt-20 flex items-center justify-center">
          <div className="flex items-center justify-center gap-3 rounded-md bg-[#222222] px-3 py-2 text-2xl">
            <div>{invite.link}</div>
            <CopyButton code={invite.link} className="mt-2" />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

import { redirect } from "next/navigation";
import CopyButton from "~/components/ui/copybutton";
import SectionLayout from "~/components/ui/sectionlayout";
import { validateRequest } from "~/server/actions/auth";
import { getMyFriends } from "~/server/actions/friends";
import { createFriendInvite } from "~/server/actions/invites";
import Image from "next/image";

export default async function Friends({
  searchParams,
}: {
  searchParams: {
    focus?: string;
  };
}) {
  const { user } = await validateRequest();

  if (!user) {
    redirect(`/login/google`);
  }

  const invite = await createFriendInvite();
  const friends = await getMyFriends();

  return (
    <SectionLayout>
      <h1 className="my-4 text-center text-3xl font-semibold">Friends</h1>

      <div className="flex w-full flex-col items-center justify-center">
        {friends.length === 0 && (
          <div className="text-center text-gray-300">
            <h2 className="mb-3">No friends found.</h2>
          </div>
        )}

        {friends.length > 0 && (
          <div>
            {friends.map((friend) => (
                <div key={friend.id} className={`py-2 px-6 rounded-lg flex items-center gap-4 ${(friend.id === Number(searchParams.focus)) && "bg-green-900 bg-opacity-50"}`}>
                <Image
                  src={friend.friend.avatar ?? ""}
                  alt={friend.friend.name}
                  width={42}
                  height={42}
                  className="rounded-full"
                />
                <div className="text-center">{friend.friend.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mt-20 flex items-center justify-center">
          <div className="flex items-center justify-center gap-3 rounded-md bg-[#222222] px-6 py-3 text-xl">
            <div>Friend Request Link</div>
            <CopyButton code={invite.link} className="my-1" size={16} />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

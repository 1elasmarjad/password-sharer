import ProfileForm from "~/components/profileform";
import SectionLayout from "~/components/ui/sectionlayout";
import { validateRequest } from "~/server/actions/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export default function Profile() {
  return (
    <>
      {/* <SectionLayout>
        <form
          action={async (data: FormData) => {
            "use server";

            const { user } = await validateRequest();

            if (!user) {
              // todo
              return;
            }

            await db.insert(users).values({
              id: data.get("id")?.toString(),
              phoneNumber: data.get("phoneNumber")?.toString(),
            });
          }}
        >
          <ProfileForm />
        </form>
      </SectionLayout> */}
    </>
  );
}

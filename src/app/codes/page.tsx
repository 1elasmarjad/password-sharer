import HiddenCode from "~/components/ui/hidden-code";
import SectionLayout from "~/components/ui/sectionlayout";
import { myCodes } from "~/server/actions/codes";

export default async function CodesPage() {
  const allCodes = await myCodes();

  return (
    <main className="flex flex-col">
      <SectionLayout>
        <div className="flex w-full flex-col items-center gap-4 my-6">
          {allCodes.map((code) => (
            <HiddenCode codeId={code.id} key={code.id} />
          ))}
        </div>
      </SectionLayout>
    </main>
  );
}

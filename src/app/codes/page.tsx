import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import HiddenCode from "~/components/ui/hidden-code";
import SectionLayout from "~/components/ui/sectionlayout";
import { validateRequest } from "~/server/actions/auth";
import { myCodes } from "~/server/actions/codes";

const PAGE_SIZE = 5;

export default async function CodesPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const { user } = await validateRequest();

  if (!user) {
    redirect(`/login/google`);
  }

  const page = Number(searchParams.page ?? 1);

  const allCodes = await myCodes({
    page: page,
    limit: PAGE_SIZE,
  });

  const prevUrl = allCodes.prevPageExists ? `/codes?page=${page - 1}` : "";
  const nextUrl = allCodes.nextPageExists ? `/codes?page=${page + 1}` : "";

  return (
    <main className="flex flex-col">
      <SectionLayout>
        <div className="mt-16 flex w-full flex-col items-center gap-4">
          {allCodes.data.length === 0 && (
            <div className="text-center text-gray-300">
              <h2 className="mb-3">No hidden codes found.</h2>
              <Link
                href="/generate"
                className="text-md group flex w-full select-none items-center justify-center gap-2 rounded border-2 border-gray-700 py-1 tracking-widest text-gray-300 transition-all hover:bg-gray-700 sm:text-lg"
              >
                Create Code
              </Link>
            </div>
          )}

          {allCodes.data.length > 0 &&
            allCodes.data.map((code) => (
              <HiddenCode codeData={code} key={code.id} />
            ))}
        </div>

        <footer className="mt-12 flex items-center justify-center gap-3">
          <Link
            href={prevUrl}
            className={`rounded-full p-1.5 font-bold text-gray-300 ${allCodes.prevPageExists ? "bg-[#77B9EE]" : "bg-[#4e789b] hover:cursor-default"}`}
          >
            <ChevronLeft />
          </Link>

          <div className="px-2 font-semibold text-gray-300">{page}</div>

          <Link
            className={`rounded-full p-1.5 font-bold text-gray-300 ${allCodes.nextPageExists ? "bg-[#77B9EE]" : "bg-[#4e789b] hover:cursor-default"}`}
            href={nextUrl}
          >
            <ChevronRight />
          </Link>
        </footer>
      </SectionLayout>
    </main>
  );
}

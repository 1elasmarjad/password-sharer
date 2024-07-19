import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import HiddenCode from "~/components/ui/hidden-code";
import SectionLayout from "~/components/ui/sectionlayout";
import { myCodes } from "~/server/actions/codes";

const PAGE_SIZE = 10;

export default async function CodesPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = Number(searchParams.page ?? 1);

  const allCodes = await myCodes({
    page: page,
    limit: PAGE_SIZE,
  });

  let prevUrl = "";
  let nextUrl = "";

  if (allCodes.prevPageExists) {
    prevUrl = `/codes?page=${page - 1}`;
  }

  if (allCodes.nextPageExists) {
    nextUrl = `/codes?page=${page + 1}`;
  }

  return (
    <main className="flex flex-col">
      <SectionLayout>
        <div className="my-6 flex w-full flex-col items-center gap-4">
          {allCodes.data.map((code) => (
            <HiddenCode codeId={code.id} key={code.id} />
          ))}
        </div>

        <footer className="flex items-center justify-center gap-3">
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

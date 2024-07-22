import Link from "next/link";
import SectionLayout from "~/components/ui/sectionlayout";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <SectionLayout>
        <div className="mt-12 flex w-full flex-col items-center justify-center">
          <h1 className="text-center text-3xl sm:text-4xl font-semibold">
            Secure Your Screen-Time
          </h1>
          <p className="mt-4 text-center text-gray-300">
            Generate and save one-time passwords with your friends involved.
          </p>
          <Link
            href="/generate"
            className="text-md group mt-4 flex select-none items-center justify-center gap-2 rounded border-2 border-gray-700 px-4 py-1 tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700 sm:text-lg"
          >
            Create Code
          </Link>
        </div>
      </SectionLayout>
    </main>
  );
}

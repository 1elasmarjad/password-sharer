import Link from "next/link";
import SectionLayout from "~/components/ui/sectionlayout";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <SectionLayout>
        <Link href="/login/discord">Test</Link>
      </SectionLayout>
    </main>
  );
}

import Link from "next/link";
import SectionLayout from "~/components/ui/sectionlayout";

export default function HomePage() {

  const customUrl = "/login/discord?dest=%5Ctesting"

  return (
    <main className="flex flex-col">
      <SectionLayout>
        <Link href={customUrl}>Test</Link>
      </SectionLayout>
    </main>
  );
}

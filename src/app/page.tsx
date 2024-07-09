import Link from "next/link";
import Combobox from "~/components/ui/combobox";
import { generateCode } from "~/server/actions/passwords";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Link href="/login/discord">Test</Link>
    </main>
  );
}

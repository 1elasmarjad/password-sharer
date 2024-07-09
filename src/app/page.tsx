import Combobox from "~/components/ui/combobox";
import { createCode } from "~/server/actions/passwords";

export default function HomePage() {
  const code = createCode({ userId: "123" });

  return (
    <main className="flex min-h-screen flex-col">
      <>{code}</>
    </main>
  );
}

import Combobox from "~/components/ui/combobox";
import { createCode } from "~/server/actions/passwords";

export default function HomePage() {
  const code = createCode({ userId: "123" });

  return (
    <main className="flex min-h-screen flex-col">
      <div>

        <h3>Who is this for?</h3>
        <Combobox
          selectMessage="Select a user..."
          options={[
            {
              value: "next.js",
              label: "Next.js",
            },
          ]}
        />
      </div>

      <>{code}</>
    </main>
  );
}

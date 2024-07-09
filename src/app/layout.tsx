import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Providers from "./providers";
import SectionLayout from "~/components/ui/sectionlayout";
import Link from "next/link";
import { validateRequest } from "~/server/actions/auth";

export const metadata: Metadata = {
  title: "One-Time Passwords",
  description: "Generate one-time passwords that only your loved ones can see.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await validateRequest();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-[#212429]">
        <Providers>
          <div className="bg-[#222222]">
            <SectionLayout>
              <nav className="flex justify-between py-5">
                <h1 className="max-w-24 grow text-xl text-gray-100">OTP</h1>
                <ol className="flex max-w-96 grow justify-between">
                  <li>
                    <Link href="/home">Home</Link>
                  </li>
                  <li>
                    <Link href="/generate">New Code</Link>
                  </li>
                </ol>
                <div className="max-w-24 grow">{user ? <Link href="/logout/discord">Logout</Link> : <Link href="/login/discord">Discord Login</Link>}</div>
              </nav>
            </SectionLayout>
          </div>

          {children}
        </Providers>
      </body>
    </html>
  );
}

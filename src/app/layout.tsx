import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Providers from "./providers";
import SectionLayout from "~/components/ui/sectionlayout";
import Link from "next/link";
import { logout, validateRequest } from "~/server/actions/auth";

export const metadata: Metadata = {
  title: "One-Time Passwords",
  description: "Generate one-time passwords that only your loved ones can see.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await validateRequest();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-[#212429] text-gray-100">
        <Providers>
          <div className="bg-[#222222]">
            <SectionLayout>
              <nav className="flex items-center justify-between py-5">
                <Link
                  href="/"
                  className={`max-w-24 grow text-xl font-bold text-gray-100 ${montserrat.className}`}
                >
                  OneTime
                </Link>
                <ol className="flex max-w-64 grow justify-between text-gray-100">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/generate">New Code</Link>
                  </li>
                </ol>
                <div className="max-w-24 grow">
                  {user ? (
                    <>
                      {user.avatar && (
                        <form action={logout}>
                          <button>
                            {/* TODO should become a dropdown */}
                            <Image
                              src={user.avatar}
                              width={38}
                              height={38}
                              alt={`${user.name}'s pfp`}
                              className="rounded-full"
                            ></Image>
                          </button>
                        </form>
                      )}
                    </>
                  ) : (
                    <Link href="/login/google" className="flex items-center justify-center gap-2 rounded border-2 border-gray-700 px-6 py-1.5 text-md tracking-widest text-[#77B9EE] transition-all hover:bg-gray-700">Login</Link>
                  )}
                </div>
              </nav>
            </SectionLayout>
          </div>

          {children}
        </Providers>
      </body>
    </html>
  );
}

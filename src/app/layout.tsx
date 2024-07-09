import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "One-Time Passwords",
  description: "Generate one-time passwords that only your loved ones can see.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Toaster position="bottom-center" toastOptions={{
          style: {
            background: "#222222",
            color: "#d1d5db",
          }
        }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

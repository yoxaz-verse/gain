import "../styles/global.css";
import type { Metadata } from "next";
import { Providers } from "./provider";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GAIN - Global Agro Industry Network",
  description:
    "India's Best Agro Industry Network of Buyers, Suppliers, Logistics Consultants  ",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" bg-slate-950">
      <body className={`${inter.className}`} style={{ overflowX: "hidden" }}>
        {/* <AuthProvider> */}
        <Providers>{children}</Providers>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}

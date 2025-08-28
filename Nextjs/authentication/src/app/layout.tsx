import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication System",
  description: "A complete auth system with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-white text-xl font-semibold hover:text-gray-300"
            >
              AuthSystem
            </Link>
            <div className="space-x-6">
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link href="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

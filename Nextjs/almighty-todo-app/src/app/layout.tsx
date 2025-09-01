import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Almighty Todo App",
  description: "Todo App to practice NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

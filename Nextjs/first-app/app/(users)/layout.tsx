import Navigation from "@/components/Navigation";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Navigation/>
        {children}
        </body>
    </html>
  );
}

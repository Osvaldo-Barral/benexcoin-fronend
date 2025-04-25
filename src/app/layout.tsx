import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Banexcoin Frontend",
  description: "Prueba técnica para Banexcoin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}

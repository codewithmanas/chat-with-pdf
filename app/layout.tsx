import type { Metadata } from "next";
import { Inter, Old_Standard_TT, Merriweather } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  variable: "--font-old-standard-tt",
  weight: "400"
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Chat with PDF",
  description: "The AI Assistant for Your PDF Documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`min-h-screen h-screen overflow-hidden flex flex-col ${inter.variable} ${oldStandardTT.variable} ${merriweather.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import NotifyContainer from "@/components/ui/notify/notify-container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display type, always set as chrome — see docs/DESIGN.md
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

// Camcorder overlay, subtitles and body
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "love.exe — a short film about the 2000s",
  description: "Y2K chrome meets emo heartbreak: a flip phone, a burned CD and a chrome heart, turning as you scroll.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <NotifyContainer />
      </body>
    </html>
  );
}

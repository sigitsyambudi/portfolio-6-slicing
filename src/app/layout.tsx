import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edwin Anderson — Front-End Developer",
  description:
    "Front-End Developer with a passion for clean code and intuitive design. Turning ideas into functional beauty.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}

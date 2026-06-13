import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import TProvider from "@/providers/TProvider";
import FooterSection from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hireloop",
  description: "Your one-stop platform for seamless job searching and hiring. Connect with top talent and discover your dream job with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-white-bg dark:bg-black-bg flex flex-col min-h-screen">
        <TProvider>
          <header className="shrink-0">
            <NavBar />
          </header>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <footer className="shrink-0">
            <FooterSection />
          </footer>
        </TProvider>
      </body>
    </html>
  );
}
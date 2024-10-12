import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from 'next/image';
import Link from 'next/link';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Plus Que Film - Films Populaires et Recherches",
  description: "Découvrez les films populaires du moment ou recherchez vos films préférés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="./tmdb.svg" 
              alt="TMDB Logo"
              width={200}
              height={200}
            />
            <h1 className="ml-4 text-2xl font-bold">Plus Que Film</h1>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="min-h-screen">{children}</main>

        {/* Footer simple avec quelques liens */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>© 2024 Plus Que Film - Tous droits réservés</p>
          <div className="mt-2">
            <Link href="/privacy" className="mr-4">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="mr-4">
              Conditions d'utilisation
            </Link>
            <Link href="https://www.themoviedb.org/" target="_blank" className="mr-4">
              TMDB
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}

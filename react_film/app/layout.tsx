

import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from 'next/image';
import Link from 'next/link';
import { MovieProvider } from './components/MovieContext'; 
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
  title: "Plus Que Films - Films Populaires et Recherches",
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
        <MovieProvider> 
          <header className="background-color=#0d253f text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/tmdb.svg"
                alt="TMDB Logo"
                width={200}
                height={200}
                priority
              />
              <h1 className="ml-4 text-2xl font-bold">Plus Que Films</h1>
            </div>
          </header>

         
          <main className="min-h-screen">{children}</main>

          
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>© 2024 Plus Que Films - Tous droits réservés</p>
            <div className="mt-2">
              <Link href="/privacy" className="mr-4 hover:underline">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="mr-4 hover:underline">
                Conditions d'utilisation
              </Link>
              <Link href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="mr-4 hover:underline">
                TMDB
              </Link>
            </div>
          </footer>
        </MovieProvider>
      </body>
    </html>
  );
}
